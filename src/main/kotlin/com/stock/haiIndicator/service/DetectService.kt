package com.stock.haiIndicator.service

import com.google.gson.Gson
import com.stock.haiIndicator.bean.ConstDefine.SDF
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import java.util.*

@Service
class DetectService {
    fun indicateOneCode(code: String, indicatorName: String, dateStartStr: String, dateEndStr: String):
                                                                                    Either<ErrorDefine, List<String>> {
        val detector = DefineDetector.fromName(indicatorName) ?: return Left(ErrorDefine.NO_EXIST_DETECTOR)
        val resList = mutableListOf<String>()
        val listDateNoData = mutableListOf<Date>()

        val dateStart = SDF.parse(dateStartStr)
        val dateEnd = SDF.parse(dateEndStr)
        val calendar = Calendar.getInstance()
        calendar.time = dateStart

        while (!calendar.time.after(dateEnd)) {
            val currentDate = calendar.time
            println("indicateOneCode: ${SDF.format(currentDate)}")
            val resDetect = detector.detect(code, currentDate)
            println("resDetect: ${Gson().toJson(resDetect)}")
            when (resDetect) {
                is Left -> {
                    if (resDetect.value == ErrorDefine.NO_EXIST_DATA)
                        listDateNoData.add(currentDate)
                    else
                        println("resDetect $code ${SDF.format(currentDate)}: ${resDetect.value}")
                }
                is Right -> {
                    if (resDetect.value)
                        resList.add(SDF.format(currentDate))
                }
            }

            calendar.add(Calendar.DATE, 1)
        }

        return Right(resList)
    }
}
