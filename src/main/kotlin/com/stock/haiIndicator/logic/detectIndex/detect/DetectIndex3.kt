package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.logger.GlobalLogger
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResIndex
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

/**
 * VCG 12/2018
 *
 * Cứ tính 7 bước giá trước, tuning sau
 */
object DetectIndex3: IDetectIndex {
    private val aBuocGia = 0.7f
    private val percentVolumnValid = 0.7
    fun detect(data: DataOneDay): Pair<Boolean, SealedResIndex> {
        if (!isValidShape(data))
            return Pair(false, SealedResIndex())

        val aKL = percentAKL(data)
        GlobalLogger.detectLogger.debug("--------------- DetectIndex3 $aKL")
        return Pair(aKL >= percentVolumnValid, SealedResIndex())
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return isValidShape1(data)
    }

    private fun isValidShape1(data: DataOneDay): Boolean {
        GlobalLogger.detectLogger.debug("changePrice ${data.changePrice}")
        return data.GiaMoCua > data.GiaDongCua && data.changePrice < -2
    }

    private fun percentAKL(data: DataOneDay): Float {
        return data.percentKLStepUp(aBuocGia)
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResIndex>> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(detect(data))
    }
}