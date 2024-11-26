package com.stock.haiIndicator.scheduler

import FileWriter
import com.google.gson.Gson
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.dataDAO.dataVDS.entities.DataKLBf
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.define.detectConfig.CodeConfigVDS
import com.stock.haiIndicator.define.systemConfig.ToolConfig
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.logic.detectIndex.detect.index1.DetectIndex1
import com.stock.haiIndicator.logic.detectIndex.detect.index5.DetectIndex5
import com.stock.haiIndicator.logic.detectIndex.detect.index5.index5_KhongChuan.DetectIndex5KhongChuan
import com.stock.haiIndicator.logic.volumeExporter.DataKLExporter
import com.stock.haiIndicator.service.DateValidator
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import utils.TimeUtils
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

/***
 * create by PhuogNguyen in 31/03/2024
 * Hôm nay là chủ nhật, anh Hải đồng ý dạy mình lúc 1h30. Mình rất kỳ vọng vào buổi học.
 * Nhưng hôm qua ngồi ăn với Vũ,
 * Vũ nói rằng, cảm giác như Phương kỳ vọng vào 1 thứ, và nó k như kỳ vọng thì Phương cảm thấy thất vọng.
 * Đúng. Phương đang rất kỳ vọng vào buổi học hôm nay, nhưng P lại không dám đặt quá nhiều niềm tim. Vậy hạ nó xuống.
 * Nếu buổi học k hoàn hảo, không như ý, thì coi như đổi chỗ ngồi một buổi chiều. Dù sao mình cũng rảnh.
 * Anh Hải dạy mình 1 tiếng, mình sẽ ngồi code cho anh 10 tiếng. Nhưng điều anh Hải đã cho mình, mình trả bằng tiền
 * không được. Vậy trả bằng trái tim.
 * Dù sao làm xong phần mềm, bản thân mình cũng sẽ sử dụng rất nhiều.
 *
 * Cố lên Phươg nhé! <3
 */
@Component
object SchedulerService {
    private val logger = LoggerFactory.getLogger(this.javaClass.simpleName)

//    @Scheduled(cron = "0 0 15 * * *")
    fun jobAvgKLDailySchedule() {
        CoroutineScope(Dispatchers.IO).launch {
            logger.info("jobAvgKLDailySchedule ${TimeUtils.currentTimeSeconds()}")

            jobAvgKL(Date())

            logger.info("jobAvgKLDailySchedule Done ${TimeUtils.currentTimeSeconds()}")
        }
    }

    public suspend fun jobAvgKL(curDate: Date) {
        logger.info("jobAvgKL ${TimeUtils.currentTimeSeconds()}")

        if (TimeUtils.isWeekend(curDate))
            return

        val curDateStr = ConstDefine.SDF.format(curDate)
        logger.info("jobAvgKL curDateStr: $curDateStr")
        val codeToDataKL = mutableMapOf<String, DataKLBf>()

        CodeConfigVDS.codeList.forEach {
//            listOf("TPB", "HDB").forEach {
                code ->
            val calendar = Calendar.getInstance()
            calendar.time = curDate
            calendar.add(Calendar.DATE, -35)
            val listData = mutableListOf<Pair<String, DataOneDay>>()

            while (calendar.time.before(curDate)) {
                calendar.add(Calendar.DATE, 1)
                val currentDate = calendar.time
                val currentDateStr = ConstDefine.SDF.format(currentDate)
                if (!DateValidator.validateDateGet(currentDateStr))
                    continue
                val dataCur = DAO.getDataOneDay(code, currentDateStr)
                if (dataCur != null)
                    listData.add(Pair(currentDateStr, dataCur))
            }

            if (listData.size >= 20) {
                val listDataCalc = listData.subList(listData.size-20, listData.size)
                codeToDataKL[code] = DataKLBf(
                    listDataCalc.sumOf { it.second.TongKhoiLuong },
                    listDataCalc.sumOf { it.second.KLATO },
                    listDataCalc.sumOf { it.second.KLATC },
                )
            }
        }

        FileWriter.writeToFile(ToolConfig.pathOutputKL + curDateStr, Gson().toJson(codeToDataKL))
        logger.info("jobAvgKL Done $curDateStr")
    }

    /***
     * format return: date file indicator1999-01-10
     * { indicateName1: {code1: detailed1, code2: detailed2,...}, indicateName2: {codeX: detailedX, ...}, ... }
     */
//    @Scheduled(cron = "0 10 16 * * *")
    fun jobDetectDailySchedule() {
        CoroutineScope(Dispatchers.IO).launch {
            logger.info("jobDetectDailySchedule ${TimeUtils.currentTimeSeconds()}")

            jobDetect(Date())

            logger.info("jobDetectDailySchedule Done ${TimeUtils.currentTimeSeconds()}")
        }
    }

    public suspend fun jobDetect(curDate: Date) {
        logger.info("jobDetect $curDate")

        try {
            if (TimeUtils.isWeekend(curDate))
                return

            val curDateStr = ConstDefine.SDF.format(curDate)

//                val listDate = listOf("2024-03-15", "2024-03-07", "2024-03-05", "2024-03-04", "2024-03-01")
//                listDate.forEach { curDateStr ->
//                    val curDate = ConstDefine.SDF.parse(curDateStr)

            logger.warn("curDateStr: $curDateStr")
            val outputValue = mutableMapOf<String, List<String>>() //<indicatorName, list<code>>
            DefineDetector.mapNameToDetector.forEach { (indicatorName, detector) ->
                val resIndicator = mutableListOf<String>()
                CodeConfigVDS.codeList.forEach { code ->
//                    listOf<String>("TPB", "HDB").forEach { code ->
                    logger.warn("jobDetectDaily indicatorName: $indicatorName, code: $code")
                    detector.detect(code, curDate)
                    when (val resDetect = detector.detect(code, curDate)) {
                        is Left -> {
                            val errCode = resDetect.value
                            logger.warn(
                                "jobDetectDaily errCode = ${errCode.name}, indicatorName: $indicatorName, " +
                                        "code: $code"
                            )
                        }

                        is Right -> {
                            val (resultBoolean, detailedInfo) = resDetect.value
                            logger.info(
                                "jobDetectDaily resultBoolean: $resultBoolean, " +
                                        "detailedInfo: ${Gson().toJson(detailedInfo)})"
                            )
                            if (resultBoolean)
                                resIndicator.add(code)
                        }
                    }
                }
                outputValue[indicatorName] = resIndicator
            }
            logger.warn("outputValue: ${Gson().toJson(outputValue)})")

            FileWriter.writeToFile(ToolConfig.pathOutputDetectDaily + curDateStr, Gson().toJson(outputValue))
//                }
        }
        catch (e: Exception) {
            logger.error("jobDetectDaily error, timestamp = ${TimeUtils.currentTimeSeconds()}", e)
        }
        logger.info("jobDetect DONE $curDate")
    }
}