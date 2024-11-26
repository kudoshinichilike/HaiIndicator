package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.define.detectConfig.CodeConfigVDS
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.logic.cacheStore.ResultStore
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.logic.processDataBefore.ProcessDataBefore
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.stock.haiIndicator.service.DateValidator
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

//ATO
object DetectIndex8T: IDetectIndex {
    private const val NUM_DATE_BF = 20
    private const val MULTIPLY_CONDITION = 3
    fun detect(code: String, date: Date, data: DataOneDay, avgBefore: Long): Boolean {
        val aKL = calcAKL(data)
        GLLogger.detectLogger.info("--------------- DetectIndex8T aKL: $aKL, avgBefore: $avgBefore")
        if (aKL >= MULTIPLY_CONDITION * avgBefore)
            GLLogger.detectLogger.info("--------------- DetectIndex8T ${aKL/avgBefore}")
        return if (aKL != 0L && aKL >= MULTIPLY_CONDITION * avgBefore) {
            ResultStore.addResult(date, code, DefineDetector.getEnumFromDetector(this)!!)
            true
        }
        else false
    }

    private fun calcAKL(data: DataOneDay): Long {
        return data.KLATO
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        if (!CodeConfigVDS.haveATO(code))
            return Left(ErrorDefine.CODE_NOT_HAVE_ATO)

        val resultFromSuper = super.detect(code, date)
        if (resultFromSuper is Right || (resultFromSuper as Left).value == ErrorDefine.INVALID_KL_AVG)
            return resultFromSuper

        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)

        val avgBefore = ProcessDataBefore.getAvgKLBefore(code, date, NUM_DATE_BF)
            ?: return Left(ErrorDefine.CAN_NOT_CALC_AVG_BF)

        return Right(Pair(detect(code, date, data, avgBefore.avgATO), SealedResDetect()))
    }
}