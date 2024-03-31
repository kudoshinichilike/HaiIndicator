package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.logic.cacheStore.ResultStore
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex6: IDetectIndex {
    fun detect(code: String, date: Date, data: DataOneDay): Boolean {
        if (!isValidShape(data))
            return false

        val aKL = percentAKL(data)
        GLLogger.detectLogger.info("--------------- DetectIndex6 aKL: $aKL")
        return if (aKL <= 0.2) {
            ResultStore.addResult(date, code, DefineDetector.getEnumFromDetector(this)!!)
            true
        }
        else
            false
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return data.GiaMoCua > data.GiaDongCua && data.GiaCaoNhat > data.GiaMoCua
                && (data.changePrice < -4)
    }

    private fun percentAKL(data: DataOneDay): Double {
        return data.percentKLUpperPriceUnbound(data.GiaMoCua)
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        val resultFromSuper = super.detect(code, date)
        if (resultFromSuper is Right)
            return resultFromSuper

        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(Pair(detect(code, date, data), SealedResDetect()))
    }
}