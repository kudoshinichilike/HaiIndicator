package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.bean.ConstDefine
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResIndex
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

/***
 * FLC 28/8/2017
 */
object DetectIndex4: IDetectIndex {
    private val aBuocGia = 0.3f
    private val percentVolumnValid = 0.3
    fun detect(data: DataOneDay): Boolean {
        if (!isValidShape(data))
            return false

        val aKL = percentAKL(data)
//        println("--------------- DetectIndex4 $aKL")
        return aKL <= percentVolumnValid
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return isValidShape1(data)
    }

    private fun isValidShape1(data: DataOneDay): Boolean {
        return data.GiaMoCua < data.GiaDongCua && data.changePrice > 3
    }

    private fun percentAKL(data: DataOneDay): Float {
        return data.percentKLStepUp(aBuocGia)
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResIndex>> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(Pair(detect(data), SealedResIndex()))
    }
}