package com.stock.haiIndicator.service

import com.google.gson.Gson
import com.stock.haiIndicator.bean.ConstDefine.SDF
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.bean.config.CodeConfig
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.payload.res.ResSearchData
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import java.util.*

@Service
class DetectService {
    suspend fun indicateOneCode(code: String, indicatorNameList: List<String>, dateStartStr: String, dateEndStr: String):
                                                                                    Either<ErrorDefine, Map<String, List<String>>> {
        try {
            val resMap = mutableMapOf<String, List<String>>()
            if (!validateCode(code))
                return Left(ErrorDefine.INVALID_CODE)

            indicatorNameList.forEach {indicatorName ->
                println("indicateOneCode $indicatorName")
                val detector = DefineDetector.fromName(indicatorName) ?: return Left(ErrorDefine.NO_EXIST_DETECTOR)
                val resList = mutableListOf<String>()
                val listDateNoData = mutableListOf<Date>()

                val dateStart = SDF.parse(dateStartStr)
                val dateEnd = SDF.parse(dateEndStr)
                val calendar = Calendar.getInstance()
                calendar.time = dateStart
                calendar.add(Calendar.DATE, -1)

                while (!calendar.time.after(dateEnd)) {
                    calendar.add(Calendar.DATE, 1)
                    val currentDate = calendar.time
                    println("indicateOneCode currentDate: ${SDF.format(currentDate)}")
                    if (!validateDate(SDF.format(currentDate)))
                        continue

                    val resDetect = detector.detect(code, currentDate)
                    println("indicateOneCode resDetect: ${Gson().toJson(resDetect)}")
                    when (resDetect) {
                        is Left -> {
                            if (resDetect.value == ErrorDefine.NO_EXIST_DATA)
                                listDateNoData.add(currentDate)
                            else
                                println("indicateOneCode resDetect $code ${SDF.format(currentDate)}: ${resDetect.value}")
                        }
                        is Right -> {
                            if (resDetect.value)
                                resList.add(SDF.format(currentDate))
                        }
                    }
                }

                if (listDateNoData.isNotEmpty())
                    println(Gson().toJson(listDateNoData))

                resMap[indicatorName] = resList
            }

            return Right(resMap)
        }
        catch (e: Exception) {
            e.printStackTrace()
            return Left(ErrorDefine.FAIL)
        }
    }

    fun validateCode(code: String): Boolean {
        return CodeConfig.containsCode(code)
    }

    fun validateDate(dateStr: String): Boolean {
        val calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"))
        calendar.time = SDF.parse(dateStr)
        val dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK)
        if (dayOfWeek == Calendar.SUNDAY || dayOfWeek == Calendar.SATURDAY)
            return false
        return true
    }
}
