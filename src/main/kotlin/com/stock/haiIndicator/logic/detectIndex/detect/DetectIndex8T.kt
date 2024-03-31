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
import com.stock.haiIndicator.service.DateValidator
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex8T: IDetectIndex {
    private const val NUM_DATE_BF = 20
    private const val MULTIPLY_CONDITION = 3
    fun detect(code: String, date: Date, data: DataOneDay, dataBefore: List<DataOneDay>): Boolean {
        val aKL = calcAKL(data)
        val avgBefore = calcAvgBefore(dataBefore)
        GLLogger.detectLogger.info("--------------- DetectIndex8T aKL: $aKL, avgBefore: $avgBefore")
        if (aKL >= MULTIPLY_CONDITION * avgBefore)
            GLLogger.detectLogger.info("--------------- DetectIndex8T ${aKL/avgBefore}")
        return if (aKL >= MULTIPLY_CONDITION * avgBefore) {
            ResultStore.addResult(date, code, DefineDetector.getEnumFromDetector(this)!!)
            true
        }
        else false
    }

    private fun calcAvgBefore(dataBefore: List<DataOneDay>): Double  {
        return dataBefore.sumOf { it.KLATO } / dataBefore.size.toDouble()
    }

    private fun calcAKL(data: DataOneDay): Long {
        return data.KLATO
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        val resultFromSuper = super.detect(code, date)
        if (resultFromSuper is Right)
            return resultFromSuper

        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)

        val dataBefore = mutableListOf<DataOneDay>()
        var cnt = 0
        val maxCnt = 50
        val calendar = Calendar.getInstance()
        calendar.time = date

        while (cnt < maxCnt && dataBefore.size < NUM_DATE_BF) {
            cnt ++
            calendar.add(Calendar.DATE, -1)
            val currentDateStr = ConstDefine.SDF.format(calendar.time)
            if (!DateValidator.validateDateGet(currentDateStr))
                continue

            val dataCur = DAO.getDataOneDay(code, currentDateStr)
            if (dataCur != null)
                dataBefore.add(dataCur)
        }

        if (dataBefore.size < NUM_DATE_BF)
            return Left(ErrorDefine.NOT_ENOUGH_DATA)

        return Right(Pair(detect(code, date, data, dataBefore), SealedResDetect()))
    }
}