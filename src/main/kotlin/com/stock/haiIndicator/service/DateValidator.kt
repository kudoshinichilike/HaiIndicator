package com.stock.haiIndicator.service

import com.stock.haiIndicator.define.ConstDefine
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalTime
import java.time.ZoneId
import java.util.*

object DateValidator {
    val logger: Logger = LoggerFactory.getLogger("DateValidator")
    fun validateDateGet(dateStr: String): Boolean {
        val calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"))
        calendar.time = ConstDefine.SDF.parse(dateStr)
        val dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK)
        val isWeekend = dayOfWeek == Calendar.SUNDAY || dayOfWeek == Calendar.SATURDAY
        return !isWeekend && canGetToday(calendar)
    }

    private fun canGetToday(calendarCheck: Calendar): Boolean {
        val compareToday = compareDateToTodayInGMT7(calendarCheck)
        return compareToday != 1
    }

    fun validateDateDetect(dateStr: String, oneCode: Boolean = false): Boolean {
        if (Date().before(ConstDefine.SDF.parse(dateStr)))
            return false

        if (ConstDefine.SDF.parse(dateStr).before(ConstDefine.dateValidScan) && !oneCode)
            return false

        val calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"))
        calendar.time = ConstDefine.SDF.parse(dateStr)
        val dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK)
        val isWeekend = dayOfWeek == Calendar.SUNDAY || dayOfWeek == Calendar.SATURDAY
//        logger.info("validateDateDetect: ${!isWeekend && canDetectToday(calendar)}")
        return !isWeekend && canDetectToday(calendar)
//        return !isWeekend
    }

    private fun canDetectToday(calendarCheck: Calendar): Boolean {
        val compareToday = compareDateToTodayInGMT7(calendarCheck)
        return if (compareToday == 1)
            false
        else if(compareToday == 0)
            checkAfter18pm()
        else
            true
    }

    private fun compareDateToTodayInGMT7(calendar: Calendar): Int {
        val currentCalendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"))

        return when {
            calendar.get(Calendar.YEAR) < currentCalendar.get(Calendar.YEAR) ||
                    (calendar.get(Calendar.YEAR) == currentCalendar.get(Calendar.YEAR) &&
                            (calendar.get(Calendar.MONTH) < currentCalendar.get(Calendar.MONTH) ||
                                    (calendar.get(Calendar.MONTH) == currentCalendar.get(Calendar.MONTH) &&
                                            calendar.get(Calendar.DAY_OF_MONTH) < currentCalendar.get(Calendar.DAY_OF_MONTH)))) -> -1
            calendar.get(Calendar.YEAR) == currentCalendar.get(Calendar.YEAR) &&
                    calendar.get(Calendar.MONTH) == currentCalendar.get(Calendar.MONTH) &&
                    calendar.get(Calendar.DAY_OF_MONTH) == currentCalendar.get(Calendar.DAY_OF_MONTH) -> 0
            else -> 1
        }
    }

    private fun checkAfter18pm(): Boolean {
        val zoneId = ZoneId.of("GMT+7")
        val currentTime = LocalTime.now(zoneId)
        val targetTime = LocalTime.of(18, 0)
        return currentTime.isAfter(targetTime)
    }
}