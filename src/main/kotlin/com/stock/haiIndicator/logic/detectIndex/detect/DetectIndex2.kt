package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.logic.cacheStore.ResultStore
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.logic.processDataBefore.ProcessDataBefore
import com.stock.haiIndicator.payload.res.resEachIndex.ResDetect2
import com.stock.haiIndicator.payload.res.resEachIndex.ResDetect8DetailInfo
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex2: IDetectIndex {
    private const val NUM_DATE_KL_BF = 20
    private const val MULTIPLY_KL_CONDITION = 1.2

    suspend fun detect(code: String, date: Date, data: DataOneDay, avgKLBefore: Long): Pair<Boolean, SealedResDetect> {
        if (!isValidShape(data))
            return Pair(false, SealedResDetect())

        if (data.TongKhoiLuong < avgKLBefore * MULTIPLY_KL_CONDITION)
            return Pair(false, SealedResDetect())

        val aKL = percentAKL(data)
        if (aKL >= 0.8)
            return Pair(false, SealedResDetect())

        val timeBreakKL = getListTimeNen8(code, date)
        ResultStore.addResult(date, code, DefineDetector.getEnumFromDetector(this)!!)
        return Pair(true, ResDetect2(aKL, data.TongKhoiLuong / avgKLBefore.toFloat(), timeBreakKL))
    }

    private suspend fun getListTimeNen8(code: String, date: Date): List<ResDetect8DetailInfo> {
        return when (val resNen8 = DetectIndex8.detectResDetailInfo(code, 2, 10, date)) {
            is Left -> emptyList()
            is Right -> resNen8.value
        }
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return data.GiaCaoNhat > data.GiaMoCua && data.GiaMoCua >= data.GiaDongCua && data.GiaThapNhat == data.GiaDongCua
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
        val dataKLBefore = ProcessDataBefore.getAvgKLBefore(code, date, NUM_DATE_KL_BF)
            ?: return Left(ErrorDefine.CAN_NOT_CALC_AVG_BF)


        return try {
            val detectCurDate = detect(code, date, data, dataKLBefore.avgKL)
            Right(detectCurDate)
        } catch (e: Exception) {
            GLLogger.detectLogger.error("detect $code $dateStr", e)
            Left(ErrorDefine.EXCEPTION_IN_DETECT)
        }
    }
}