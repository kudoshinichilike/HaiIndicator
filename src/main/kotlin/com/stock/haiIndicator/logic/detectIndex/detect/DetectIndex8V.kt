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
import com.stock.haiIndicator.logic.detectIndex.detect.index1.DetectIndex1
import com.stock.haiIndicator.logic.processDataBefore.ProcessDataBefore
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.stock.haiIndicator.service.DateValidator
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

//ATC
object DetectIndex8V: IDetectIndex {
    private const val NUM_DATE_BF = 20
    private const val MULTIPLY_CONDITION = 2
    fun detect(code: String, date: Date, data: DataOneDay, avgBefore: Long): Boolean {
        val bKL = calcBKL(data)
        GLLogger.detectLogger.info("--------------- DetectIndex8V bKL: $bKL, avgBefore: $avgBefore")
        if (bKL >= MULTIPLY_CONDITION * avgBefore)
            GLLogger.detectLogger.info("--------------- DetectIndex8V ${bKL/avgBefore}")
        return if (bKL != 0L && bKL >= MULTIPLY_CONDITION * avgBefore) {
            ResultStore.addResult(date, code, DefineDetector.getEnumFromDetector(this)!!)
            true
        }
        else false
    }

    private fun calcBKL(data: DataOneDay): Long {
        return data.KLATC
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        if (!CodeConfigVDS.haveATC(code))
            return Left(ErrorDefine.CODE_NOT_HAVE_ATC)

        val resultFromSuper = super.detect(code, date)
        if (resultFromSuper is Right || (resultFromSuper as Left).value == ErrorDefine.INVALID_KL_AVG)
            return resultFromSuper

        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)

        val avgBefore = ProcessDataBefore.getAvgKLBefore(code, date, NUM_DATE_BF)
            ?: return Left(ErrorDefine.CAN_NOT_CALC_AVG_BF)

        return Right(Pair(detect(code, date, data, avgBefore.avgATC), SealedResDetect()))
    }
}