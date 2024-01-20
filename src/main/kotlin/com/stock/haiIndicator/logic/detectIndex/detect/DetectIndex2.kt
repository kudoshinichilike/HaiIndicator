package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.logger.GlobalLogger
import com.stock.haiIndicator.logic.processDataBefore.ProcessDataBefore
import com.stock.haiIndicator.payload.res.resEachIndex.ResIndex2
import com.stock.haiIndicator.payload.res.resEachIndex.ResIndex8DetailInfo
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResIndex
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex2: IDetectIndex {
    private const val NUM_DATE_KL_BF = 20
    private const val MULTIPLY_KL_CONDITION = 1.2

    suspend fun detect(code: String, date: Date, data: DataOneDay, avgKLBefore: Long): Pair<Boolean, SealedResIndex> {
        if (!isValidShape(data))
            return Pair(false, SealedResIndex())

        if (data.TongKhoiLuong < avgKLBefore * MULTIPLY_KL_CONDITION)
            return Pair(false, SealedResIndex())

        val aKL = percentAKL(data)
        if (aKL >= 0.8)
            return Pair(false, SealedResIndex())

        val timeBreakKL = getListTimeNen8(code, date)
        return Pair(true, ResIndex2(aKL, data.TongKhoiLuong / avgKLBefore.toFloat(), timeBreakKL))
    }

    private suspend fun getListTimeNen8(code: String, date: Date): List<ResIndex8DetailInfo> {
        return when (val resNen8 = DetectIndex8.detectResDetailInfo(code, 2, 10, date)) {
            is Left -> emptyList()
            is Right -> resNen8.value
        }
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return data.GiaCaoNhat > data.GiaMoCua && data.GiaMoCua >= data.GiaDongCua && data.GiaThapNhat == data.GiaDongCua
    }

    private fun percentAKL(data: DataOneDay): Float {
        return data.percentKLUpperPriceUnbound(data.GiaMoCua)
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResIndex>> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        val avgKLBefore = ProcessDataBefore.getAvgKLBefore(code, date, NUM_DATE_KL_BF)
        if (avgKLBefore == -1L)
            return Left(ErrorDefine.CAN_NOT_CALC_AVG_BF)

        return try {
            val detectCurDate = detect(code, date, data, avgKLBefore)
            Right(detectCurDate)
        } catch (e: Exception) {
            GlobalLogger.detectLogger.error("detect $code $dateStr", e)
            Left(ErrorDefine.EXCEPTION_IN_DETECT)
        }
    }
}