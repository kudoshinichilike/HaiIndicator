package com.stock.haiIndicator.scheduler

import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import utils.TimeUtils
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.TimeZone

@Component
class SchedulerService {
    private val logger = LoggerFactory.getLogger(this.javaClass)

    @Scheduled(fixedRate = 3_000, initialDelay = 5_000)
    fun testSchedule() {
        logger.warn("test Logg")
    }

    /***
     * format return: date file 10-01-1999
     * { indicateName1: [code1, code2,...], indicateName2: [code3, code4,...], ... }
     */
    @Scheduled(cron = "0 30 15 * * *")
    fun jobDetectDaily() {
        logger.info("jobDetectDaily ${TimeUtils.currentTimeSeconds()}")

        val gmtPlus7TimeZone = TimeZone.getTimeZone("GMT+7")
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy").withZone(gmtPlus7TimeZone.toZoneId())

        // Get the current date
        val currentDate = LocalDate.now()

        // Format the current date in the desired time zone
        val formattedDate = currentDate.format(formatter)
    }
}