package com.stock.haiIndicator.service

import com.google.gson.Gson
import com.stock.haiIndicator.bean.ConstDefine.SDF
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.bean.config.CodeConfig
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.logic.detectIndex.detect.DetectIndex8
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import org.springframework.stereotype.Service
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
//                println("indicateOneCode $indicatorName")
                val detector = DefineDetector.fromName(indicatorName) ?: return Left(ErrorDefine.NO_EXIST_DETECTOR)
                val resList = mutableListOf<String>()
                val listDateNoData = mutableListOf<Date>()

                val dateStart = SDF.parse(dateStartStr)
                val dateEnd = SDF.parse(dateEndStr)
                val calendar = Calendar.getInstance()
                calendar.time = dateStart
                calendar.add(Calendar.DATE, -1)

                while (calendar.time.before(dateEnd)) {
                    calendar.add(Calendar.DATE, 1)
                    val currentDate = calendar.time
//                    println("indicateOneCode currentDate: ${SDF.format(currentDate)}")
                    if (!DateValidator.validateDateDetect(SDF.format(currentDate))) {
//                        println("invalidateDate: ${SDF.format(currentDate)}")
                        continue
                    }

                    val resDetect = detector.detect(code, currentDate)
//                    println("indicateOneCode resDetect: ${Gson().toJson(resDetect)}")
                    when (resDetect) {
                        is Left -> {
                            if (resDetect.value == ErrorDefine.NO_EXIST_DATA)
                                listDateNoData.add(currentDate)
//                            else
//                                println("indicateOneCode resDetect $code ${SDF.format(currentDate)}: ${resDetect.value}")
                        }
                        is Right -> {
                            if (resDetect.value)
                                resList.add(SDF.format(currentDate))
                        }
                    }
                }

                if (listDateNoData.isNotEmpty())
//                    println(Gson().toJson(listDateNoData))

                resMap[indicatorName] = resList
            }

            return Right(resMap)
        }
        catch (e: Exception) {
//            e.printStackTrace()
            return Left(ErrorDefine.FAIL)
        }
    }

    suspend fun detectOneIndicator(codeList: List<String>, indicatorName: String, dateStartStr: String, dateEndStr: String):
            Either<ErrorDefine, Map<String,List<String>>> {
        try {
            val detector = DefineDetector.fromName(indicatorName) ?: return Left(ErrorDefine.NO_EXIST_DETECTOR)
            codeList.forEach { code ->
                if (!validateCode(code))
                    return Left(ErrorDefine.INVALID_CODE)
            }

            val resMap = mutableMapOf<String, List<String>>()
            val dateStart = SDF.parse(dateStartStr)
            val dateEnd = SDF.parse(dateEndStr)
            val calendar = Calendar.getInstance()
            calendar.time = dateStart
            calendar.add(Calendar.DATE, -1)

            while (!calendar.time.after(dateEnd)) {
                calendar.add(Calendar.DATE, 1)
                val currentDate = calendar.time
//                println("detectOneIndicator currentDate: ${SDF.format(currentDate)}")
                if (!DateValidator.validateDateDetect(SDF.format(currentDate)))
                    continue

                val resList = mutableListOf<String>()
                val listDateNoData = mutableListOf<Date>()
                codeList.forEach {code ->
                    val resDetect = detector.detect(code, currentDate)
//                    println("detectOneIndicator resDetect: ${Gson().toJson(resDetect)}")
                    when (resDetect) {
                        is Left -> {
                            if (resDetect.value == ErrorDefine.NO_EXIST_DATA)
                                listDateNoData.add(currentDate)
//                            else
//                                println("detectOneIndicator resDetect error $code ${SDF.format(currentDate)}: ${resDetect.value}")
                        }
                        is Right -> {
                            if (resDetect.value)
                                resList.add(code)
                        }
                    }
                }

//                if (listDateNoData.isNotEmpty())
//                    println(Gson().toJson(listDateNoData))

                resMap[SDF.format(currentDate)] = resList
            }

//            println("detectOneIndicator resMap: ${Gson().toJson(resMap)}")
            return Right(resMap)
        }
        catch (e: Exception) {
//            e.printStackTrace()
            return Left(ErrorDefine.FAIL)
        }
    }

    fun validateCode(code: String): Boolean {
        return CodeConfig.containsCode(code)
    }

    fun getListIndicator(): List<String> {
        return DefineDetector.mapNameToDetector.keys.toList()
    }

    suspend fun detectNen8(codeList: List<String>, multiply: Int, numDateBf: Int,
                           dateStartStr: String, dateEndStr: String):
            Either<ErrorDefine, Map<String,List<String>>> {
        try {
            codeList.forEach { code ->
                if (!validateCode(code))
                    return Left(ErrorDefine.INVALID_CODE)
            }

            val detector = DetectIndex8

            val resMap = mutableMapOf<String, List<String>>()
            val dateStart = SDF.parse(dateStartStr)
            val dateEnd = SDF.parse(dateEndStr)
            val calendar = Calendar.getInstance()
            calendar.time = dateStart
            calendar.add(Calendar.DATE, -1)

            while (!calendar.time.after(dateEnd)) {
                calendar.add(Calendar.DATE, 1)
                val currentDate = calendar.time
//                println("detectOneIndicator currentDate: ${SDF.format(currentDate)}")
                if (!DateValidator.validateDateDetect(SDF.format(currentDate)))
                    continue

                val resList = mutableListOf<String>()
                val listDateNoData = mutableListOf<Date>()
                codeList.forEach {code ->
                    val resDetect = detector.detect(code, multiply, numDateBf, currentDate)
//                    println("detectOneIndicator resDetect: ${Gson().toJson(resDetect)}")
                    when (resDetect) {
                        is Left -> {
                            if (resDetect.value == ErrorDefine.NO_EXIST_DATA)
                                listDateNoData.add(currentDate)
//                            else
//                                println("detectOneIndicator resDetect error $code ${SDF.format(currentDate)}: ${resDetect.value}")
                        }
                        is Right -> {
                            if (resDetect.value.isNotEmpty())
                                resList.addAll(resDetect.value)
                        }
                    }
                }

//                if (listDateNoData.isNotEmpty())
//                    println(Gson().toJson(listDateNoData))

                resMap[SDF.format(currentDate)] = resList
            }

//            println("detectOneIndicator resMap: ${Gson().toJson(resMap)}")
            return Right(resMap)
        }
        catch (e: Exception) {
//            e.printStackTrace()
            return Left(ErrorDefine.FAIL)
        }
    }
}
