package com.stock.haiIndicator.logic.processDataBefore

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.dataDAO.dataVDS.entities.DataKLBf
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.logic.cacheStore.KLStore
import com.stock.haiIndicator.service.DateValidator
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object ProcessDataBefore {
    suspend fun getAvgKLBefore(code: String, date: Date, numDataBfNeed: Int): DataKLBf? {
        val dataKL = KLStore.getDataKL(date, code)
        return dataKL
            ?: when (val eListDataBefore = getDataBefore(code, date, numDataBfNeed)) {
                is Left -> {
                    val listDataBefore = eListDataBefore.value
                    val resDataKL = DataKLBf(
                        listDataBefore.sumOf { it.TongKhoiLuong },
                        listDataBefore.sumOf { it.KLATO },
                        listDataBefore.sumOf { it.KLATC },
                    )

                    KLStore.addDataKL(date, code, resDataKL)
                    resDataKL
                }

                is Right -> null
            }
    }

    private fun calcMaxDateBfScan(numDataBfNeed: Int): Int {
        val week = numDataBfNeed / 7 + 1
        val numWeekend = week * 2
        return numWeekend + numDataBfNeed + 15
    }

    suspend fun getDataBefore(code: String, date: Date, numDataBf: Int): Either<List<DataOneDay>, ErrorDefine> {
        if (numDataBf == 0)
            return Left(emptyList())

        val dateStr = ConstDefine.SDF.format(date)
        val dataBefore = mutableListOf<DataOneDay>()
        var cnt = 0
        val maxCnt = calcMaxDateBfScan(numDataBf)
        val calendar = Calendar.getInstance()
        calendar.time = date
        while (cnt < maxCnt && dataBefore.size < numDataBf) {
            cnt ++
            calendar.add(Calendar.DATE, -1)
            val currentDateStr = ConstDefine.SDF.format(calendar.time)
            if (!DateValidator.validateDateGet(currentDateStr))
                continue

            val dataCur = DAO.getDataOneDay(code, currentDateStr)
            if (dataCur != null)
                dataBefore.add(dataCur)
        }

        if (dataBefore.size < numDataBf) {
            GLLogger.detectLogger.warn("error getDataBefore code: $code, dateStr: $dateStr, numDataBf: $numDataBf")
            return Right(ErrorDefine.NOT_ENOUGH_DATA)
        }

        return Left(dataBefore)
    }
}