package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.bean.ConstDefine
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResIndex
import com.stock.haiIndicator.service.DateValidator
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex7: IDetectIndex {
    private const val NUM_DATE_BF = 3
    private const val PERCENT_VOL = 0.75
    fun detect(data: DataOneDay, dataBefore: List<DataOneDay>): Boolean {
        if (!isValidShape(data, dataBefore))
            return false

        val avgVolBf = calcAvgBefore(dataBefore)
        return data.TongKhoiLuong < avgVolBf*PERCENT_VOL
    }

    private fun calcAvgBefore(dataBefore: List<DataOneDay>): Double  {
        return dataBefore.sumOf { it.TongKhoiLuong } / dataBefore.size.toDouble()
    }

    private fun isValidShape(data: DataOneDay, dataBefore: List<DataOneDay>): Boolean {
        dataBefore.forEach {
            if (!DetectIndex6.detect(it))
                return false
        }
        return data.GiaDongCua > data.GiaMoCua
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResIndex>> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)

        val dataBefore = mutableListOf<DataOneDay>()
        var cnt = 0
        val maxCnt = 7
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

        return Right(Pair(detect(data, dataBefore), SealedResIndex()))
    }
}