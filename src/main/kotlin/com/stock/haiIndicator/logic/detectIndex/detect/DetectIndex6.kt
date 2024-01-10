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

object DetectIndex6: IDetectIndex {
    fun detect(data: DataOneDay): Boolean {
        if (!isValidShape(data))
            return false

        val aKL = percentAKL(data)
//        println("--------------- DetectIndex6 aKL: $aKL")
        return aKL <= 0.2
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return data.GiaMoCua > data.GiaDongCua && data.GiaCaoNhat > data.GiaMoCua
                && (data.changePrice < -4)
    }

    private fun percentAKL(data: DataOneDay): Float {
        return data.percentKLUpperPriceUnbound(data.GiaMoCua)
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResIndex>> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(Pair(detect(data), SealedResIndex()))
    }
}