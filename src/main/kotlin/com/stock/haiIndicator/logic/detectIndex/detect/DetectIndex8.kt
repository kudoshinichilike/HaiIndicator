package com.stock.haiIndicator.logic.detectIndex.detect

import com.google.gson.Gson
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.payload.res.resEachIndex.ResDetect8DetailInfo
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.stock.haiIndicator.service.DateValidator
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*


object DetectIndex8: IDetectIndex {
    private const val MINUTE_BREAK = 30 //second
    private const val GAP_SECOND = 180 //second
    private const val CAN_NOT_GET_KL_BF = 10000000000L
    fun detect(code: String, date: Date, multiply: Int, data: DataOneDay, dataBefore: List<Pair<String, DataOneDay>>): List<String> {
        val resList = mutableListOf<String>()
        val dateStr = ConstDefine.SDF.format(date)

        val calendar = Calendar.getInstance()
        calendar.time = date
        calendar.set(Calendar.HOUR_OF_DAY, 9)
        calendar.set(Calendar.MINUTE, 15)
        calendar.set(Calendar.SECOND, 0)

        val endTime = Calendar.getInstance()
        endTime[Calendar.HOUR_OF_DAY] = 14
        endTime[Calendar.MINUTE] = 15
        endTime[Calendar.SECOND] = 0

        while (calendar.before(endTime)) {
            val currentTimestampSc = calendar.timeInMillis/1000

            val calendarEndGap = Calendar.getInstance()
            calendarEndGap.time = calendar.time
            calendarEndGap.add(Calendar.MINUTE, MINUTE_BREAK)
            val timeStampEndGap = calendarEndGap.timeInMillis/1000

            val (klCurDate, avgPrice) = calcKLCurDate(currentTimestampSc, timeStampEndGap, data)
            val klBefore = calcAvgBefore(dataBefore,
                                calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE),
                                calendarEndGap.get(Calendar.HOUR_OF_DAY), calendarEndGap.get(Calendar.MINUTE))
            if (klBefore == CAN_NOT_GET_KL_BF)
                continue

            if (klCurDate != 0L && klCurDate > klBefore * multiply) {
                val timeRes = code + " " + calendar.get(Calendar.HOUR_OF_DAY) + ":" + calendar.get(Calendar.MINUTE) +
                        "\n($klCurDate>$klBefore*$multiply)"
                GLLogger.detectLogger.info("DetectIndex8 $timeRes | klCurDate: $klCurDate | klBefore: $klBefore")
                resList.add(timeRes)
            }

            calendar.add(Calendar.MINUTE, 15)
        }

        return resList
    }

    private fun calcAvgBefore(dataBefore: List<Pair<String, DataOneDay>>,
                              hoursStart: Int, minutesStart: Int,
                              hoursEnd: Int, minutesEnd: Int): Long  {
        var sumBefore = 0L
        var cntDate = 0
        dataBefore.forEach { pair ->
            val dateStr = pair.first
            val dataOneDayBf = pair.second

            val curDate = ConstDefine.SDF.parse(dateStr)
            val calenderStart = Calendar.getInstance()
            calenderStart.time = curDate
            calenderStart[Calendar.HOUR_OF_DAY] = hoursStart
            calenderStart[Calendar.MINUTE] = minutesStart
            calenderStart[Calendar.SECOND] = 0
            val timestampStart = calenderStart.timeInMillis/1000

            val calenderEnd = Calendar.getInstance()
            calenderEnd.time = curDate
            calenderEnd[Calendar.HOUR_OF_DAY] = hoursEnd
            calenderEnd[Calendar.MINUTE] = minutesEnd
            calenderEnd[Calendar.SECOND] = 0
            val timestampEnd = calenderStart.timeInMillis/1000

            val sumCurDate = dataOneDayBf.DlChiTiet
                .filter { it.timeStamp in timestampStart..timestampEnd }
                .sumOf { it.KLLo.toLong() }

            if (sumCurDate in 900L..200000000L) {
                sumBefore += sumCurDate
                cntDate ++
            }
        }
        if (cntDate == 0)
            return CAN_NOT_GET_KL_BF
        GLLogger.detectLogger.info("sumBefore $sumBefore")
        return sumBefore / cntDate
    }

    private fun calcKLCurDate(timestampStart: Long, timestampEnd: Long, data: DataOneDay): Pair<Long, Float> {
        var sumPrice = 0.0
        var sumKL = 0L
        data.DlChiTiet
            .filter { it.timeStamp in timestampStart..timestampEnd }
            .forEach {
                sumPrice += it.Gia * it.KLLo.toDouble()
                sumKL += it.KLLo.toLong()
            }

        return Pair(sumKL, (sumPrice / sumKL).toFloat())
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        val resultFromSuper = super.detect(code, date)
        if (resultFromSuper is Right)
            return resultFromSuper

        return Left(ErrorDefine.FAIL)
    }

    suspend fun detect(code: String, multiply: Int, numDateBf: Int, date: Date): Either<ErrorDefine, List<String>> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)

        val dataBefore = mutableListOf<Pair<String, DataOneDay>>()
        var cnt = 0
        val maxCnt = 50
        val calendar = Calendar.getInstance()
        calendar.time = date

        while (cnt < maxCnt && dataBefore.size < numDateBf) {
            cnt ++
            calendar.add(Calendar.DATE, -1)
            val currentDateStr = ConstDefine.SDF.format(calendar.time)
            if (!DateValidator.validateDateGet(currentDateStr))
                continue

            val dataCur = DAO.getDataOneDay(code, currentDateStr)
            if (dataCur != null)
                dataBefore.add(Pair(currentDateStr, dataCur))
        }

        if (dataBefore.size < numDateBf)
            return Left(ErrorDefine.NOT_ENOUGH_DATA)

        return Right(detect(code, date, multiply, data, dataBefore))
    }

    suspend fun detectResDetailInfo(code: String, multiply: Int, numDateBf: Int, date: Date):
                            Either<ErrorDefine, List<ResDetect8DetailInfo>> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)

        val dataBefore = mutableListOf<Pair<String, DataOneDay>>()
        var cnt = 0
        val maxCnt = 50
        val calendar = Calendar.getInstance()
        calendar.time = date

        while (cnt < maxCnt && dataBefore.size < numDateBf) {
            cnt ++
            calendar.add(Calendar.DATE, -1)
            val currentDateStr = ConstDefine.SDF.format(calendar.time)
            if (!DateValidator.validateDateGet(currentDateStr))
                continue

            val dataCur = DAO.getDataOneDay(code, currentDateStr)
            if (dataCur != null)
                dataBefore.add(Pair(currentDateStr, dataCur))
        }

        if (dataBefore.size < numDateBf)
            return Left(ErrorDefine.NOT_ENOUGH_DATA)

        return Right(detectResDetailInfo(code, date, multiply, data, dataBefore))
    }

    private fun detectResDetailInfo(code: String, date: Date, multiply: Int,
                    data: DataOneDay, dataBefore: List<Pair<String, DataOneDay>>): List<ResDetect8DetailInfo> {
        val resList = mutableListOf<ResDetect8DetailInfo>()
        val dateStr = ConstDefine.SDF.format(date)

        val calendar = Calendar.getInstance()
        calendar.time = date
        calendar.set(Calendar.HOUR_OF_DAY, 9)
        calendar.set(Calendar.MINUTE, 15)
        calendar.set(Calendar.SECOND, 0)

        val endTime = Calendar.getInstance()
        endTime[Calendar.HOUR_OF_DAY] = 14
        endTime[Calendar.MINUTE] = 15
        endTime[Calendar.SECOND] = 0

        while (calendar.before(endTime)) {
            val currentTimestampSc = calendar.timeInMillis/1000

            val calendarEndGap = Calendar.getInstance()
            calendarEndGap.time = calendar.time
            calendarEndGap.add(Calendar.MINUTE, MINUTE_BREAK)
            val timeStampEndGap = calendarEndGap.timeInMillis/1000

            val (klCurDate, avgPrice) = calcKLCurDate(currentTimestampSc, timeStampEndGap, data)
            val klBefore = calcAvgBefore(dataBefore,
                calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE),
                calendarEndGap.get(Calendar.HOUR_OF_DAY), calendarEndGap.get(Calendar.MINUTE))

            if (klBefore != CAN_NOT_GET_KL_BF && klCurDate != 0L && klCurDate > klBefore * multiply) {
                val timeRes = "${calendar.get(Calendar.HOUR_OF_DAY)}:${calendar.get(Calendar.MINUTE)}"
                val info = ResDetect8DetailInfo(timeRes, klCurDate / klBefore.toFloat(), klCurDate, avgPrice)
                resList.add(info)
            }

            calendar.add(Calendar.MINUTE, 15)
        }

        GLLogger.detectLogger.info("code: $code, date: $dateStr, resList: ${Gson().toJson(resList)}")
        return resList
    }
}