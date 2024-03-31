package com.stock.haiIndicator.dataDAO.input

import com.stock.haiIndicator.define.ConstDefine
import kotlinx.serialization.Serializable
import java.time.LocalDateTime
import java.time.ZonedDateTime
import java.util.*
import kotlin.math.round

@Serializable
data class DataOneMatch(
    val ThoiGian: String,
    val Gia: Float,
    var KLLo: Float,
    var KLTichLuy: Float,
) {
    @Transient
    val timeStamp: Long = calcTimestamp()

    init {
        KLLo = round(KLLo)
        KLTichLuy = round(KLTichLuy)
    }

    private fun calcTimestamp(): Long {
        if (ThoiGian.length == 8)
            return calcTimeWithoutDate()

        val timeParse = if (ThoiGian.length > 19) ThoiGian.substring(0, 19) else ThoiGian
        val localDateTime = LocalDateTime.parse(timeParse, ConstDefine.formatter)
        val zonedDateTime = ZonedDateTime.of(localDateTime, ConstDefine.zone)
        return zonedDateTime.toEpochSecond()
    }

    //Have data time is 09:15:03
    private fun calcTimeWithoutDate(): Long {
        return 0 //TODO("tinh sau")
    }

    fun isInATO(): Boolean {
        val calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"))
        calendar.timeInMillis = timeStamp * 1000
        if (ThoiGian.contains("T09"))
            return calendar.get(Calendar.HOUR_OF_DAY) == 9 && calendar.get(Calendar.MINUTE) == 15
        else if (ThoiGian.contains("T02"))
            return calendar.get(Calendar.HOUR_OF_DAY) == 2 && calendar.get(Calendar.MINUTE) == 15
        else
            return false //TODO(calc ato)
    }

    fun isInATC(): Boolean {
        val calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"))
        calendar.timeInMillis = timeStamp * 1000
        if (ThoiGian.contains("T14:"))
            return calendar.get(Calendar.HOUR_OF_DAY) == 14 && (calendar.get(Calendar.MINUTE) in 30..45)
        else if (ThoiGian.contains("T07:"))
            return calendar.get(Calendar.HOUR_OF_DAY) == 7 && (calendar.get(Calendar.MINUTE) in 30..45)
        else
            return false //TODO(calc ato)
    }

    fun isInPhien2(): Boolean {
        return !isInATO() && !isInATC()
    }
}