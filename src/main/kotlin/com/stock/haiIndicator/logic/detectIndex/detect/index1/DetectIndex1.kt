package com.stock.haiIndicator.logic.detectIndex.detect.index1

import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.logic.cacheStore.ResultStore
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.logic.detectIndex.detect.IDetectIndex
import com.stock.haiIndicator.logic.processDataBefore.ProcessDataBefore
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*
import kotlin.math.max
import kotlin.math.min

object DetectIndex1: IDetectIndex {
    private const val NUM_DATE_KL_BF = 20
    private const val MULTIPLY_KL_CONDITION = 1.2
    private const val DATE_SAME_CANDLE_BF = 0 //TODO: cai nay phai la 2, tam sua thanh 0
    private const val NUM_SAME_CANDLE_BF = 0

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        val resultFromSuper = super.detect(code, date)
        if (resultFromSuper is Right)
            return resultFromSuper

        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        val avgKLBefore = ProcessDataBefore.getAvgKLBefore(code, date, NUM_DATE_KL_BF)
            ?: return Left(ErrorDefine.CAN_NOT_CALC_AVG_BF)

        val detectCurDate = detect(data, avgKLBefore.KL20Bf)
        if (!detectCurDate)
            return Right(Pair(false, SealedResDetect()))

        var validBf = 0
        val listDataBfCheckSame = ProcessDataBefore.getDataBefore(code, date, DATE_SAME_CANDLE_BF)
        if (listDataBfCheckSame is Left) {
            listDataBfCheckSame.value.forEach {
                if (detect(it, avgKLBefore.KL20Bf))
                    validBf ++
            }
        }

        return if (validBf >= NUM_SAME_CANDLE_BF) {
            ResultStore.addResult(date, code, DefineDetector.getEnumFromDetector(this)!!)
            Right(Pair(true, SealedResDetect()))
        }
        else
            Right(Pair(false, SealedResDetect()))
    }

    fun detect(data: DataOneDay, avgKLBefore: Long): Boolean {
        if (!isValidShape(data))
            return false

        if (data.TongKhoiLuong < avgKLBefore * MULTIPLY_KL_CONDITION)
            return false

        val aKL = percentAKL(data)
        GLLogger.detectLogger.info("--------------- DetectIndex1 $aKL")
        return aKL >= 0.8
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return isValidShape1(data)
//        return isValidShape2(data)
    }

    private fun isValidShape1(data: DataOneDay): Boolean {
        return data.GiaCaoNhat == data.GiaMoCua
                && data.GiaMoCua >= data.GiaDongCua
                && data.GiaDongCua > data.GiaThapNhat
    }

    private fun isValidShape2(data: DataOneDay): Boolean {
        val dk1 = min(data.GiaDongCua, data.GiaMoCua) > data.GiaThapNhat
        val dk2 = max(data.GiaDongCua, data.GiaMoCua) == data.GiaCaoNhat
        return dk1 && dk2
    }

    private fun percentAKL(data: DataOneDay): Double {
//        return data.percentKLLowerPrice(min(data.GiaDongCua, data.GiaMoCua))
        return data.percentKLLowerPrice(data.GiaDongCua)
    }
}