package com.stock.haiIndicator.service

import com.google.gson.Gson
import com.stock.haiIndicator.define.ConstDefine.SDF
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.define.detectConfig.CodeConfig
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.logic.detectIndex.detect.DetectIndex8
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*

@Service
class DetectService {
    val logger: Logger = LoggerFactory.getLogger(this.javaClass.simpleName)
    suspend fun indicateOneCode(code: String, indicatorNameList: List<String>, dateStartStr: String, dateEndStr: String)
                                : Either<ErrorDefine, Map<String, List<Pair<String, SealedResDetect>>>> {
        try {
            val resMap = mutableMapOf<String, List<Pair<String, SealedResDetect>>>()
            if (!validateCode(code))
                return Left(ErrorDefine.INVALID_CODE)

            indicatorNameList.forEach {indicatorName ->
                GLLogger.detectLogger.info("indicateOneCode $indicatorName")
                val detector = DefineDetector.fromName(indicatorName) ?: return Left(ErrorDefine.NO_EXIST_DETECTOR)
                val resList = mutableListOf<Pair<String, SealedResDetect>>()
                val listDateNoData = mutableListOf<Date>()

                val dateStart = SDF.parse(dateStartStr)
                val dateEnd = SDF.parse(dateEndStr)
                val calendar = Calendar.getInstance()
                calendar.time = dateStart
                calendar.add(Calendar.DATE, -1)

                while (calendar.time.before(dateEnd)) {
                    calendar.add(Calendar.DATE, 1)
                    val currentDate = calendar.time
                    GLLogger.detectLogger.info("indicateOneCode currentDate: ${SDF.format(currentDate)}")
                    if (!DateValidator.validateDateDetect(SDF.format(currentDate), true)) {
                        GLLogger.detectLogger.info("invalidateDate: ${SDF.format(currentDate)}")
                        continue
                    }

                    val resDetect = detector.detect(code, currentDate)
                    GLLogger.detectLogger.info("indicateOneCode resDetect: ${Gson().toJson(resDetect)}")
                    when (resDetect) {
                        is Left -> {
                            if (resDetect.value == ErrorDefine.NO_EXIST_DATA)
                                listDateNoData.add(currentDate)
                            else
                                GLLogger.detectLogger.info("indicateOneCode resDetect $code ${SDF.format(currentDate)}: ${resDetect.value}")
                        }
                        is Right -> {
                            if (resDetect.value.first)
                                resList.add(Pair(SDF.format(currentDate), resDetect.value.second))
                        }
                    }
                }

                if (listDateNoData.isNotEmpty())
                    GLLogger.detectLogger.info("indicateOneCode ${Gson().toJson(listDateNoData)}")

                resMap[indicatorName] = resList
            }

            return Right(resMap)
        }
        catch (e: Exception) {
            logger.error("indicateOneCode code: $code, indicatorNameList: ${Gson().toJson(indicatorNameList)}," +
                    "dateStartStr: $dateStartStr, dateEndStr: $dateEndStr", e)
            return Left(ErrorDefine.FAIL)
        }
    }

    suspend fun detectOneIndicator(codeList: List<String>, indicatorName: String, dateStartStr: String, dateEndStr: String):
            Either<ErrorDefine, Map<String,List<Pair<String, SealedResDetect>>>> {
        try {
            val detector = DefineDetector.fromName(indicatorName) ?: return Left(ErrorDefine.NO_EXIST_DETECTOR)
            codeList.forEach { code ->
                if (!validateCode(code))
                    return Left(ErrorDefine.INVALID_CODE)
            }

            val resMap = mutableMapOf<String, List<Pair<String, SealedResDetect>>>()
            val dateStart = SDF.parse(dateStartStr)
            val dateEnd = SDF.parse(dateEndStr)
            val calendar = Calendar.getInstance()
            calendar.time = dateStart
            calendar.add(Calendar.DATE, -1)

            while (calendar.time.before(dateEnd)) {
                calendar.add(Calendar.DATE, 1)
                val currentDate = calendar.time
                logger.info("detectOneIndicator currentDate: ${SDF.format(currentDate)}")
                if (!DateValidator.validateDateDetect(SDF.format(currentDate)))
                    continue

                val resList = mutableListOf<Pair<String, SealedResDetect>>()
                val listDateNoData = mutableListOf<Date>()
                codeList.forEach {code ->
                    val resDetect = detector.detect(code, currentDate)
                    logger.info("detectOneIndicator resDetect: ${Gson().toJson(resDetect)}")
                    when (resDetect) {
                        is Left -> {
                            if (resDetect.value == ErrorDefine.NO_EXIST_DATA)
                                listDateNoData.add(currentDate)
                            else
                                logger.info("detectOneIndicator resDetect error $code ${SDF.format(currentDate)}: ${resDetect.value}")
                        }
                        is Right -> {
                            if (resDetect.value.first)
                                resList.add(Pair(code, resDetect.value.second))
                        }
                    }
                }

                if (listDateNoData.isNotEmpty())
                    logger.info("detectOneIndicator ${Gson().toJson(listDateNoData)}")

                resMap[SDF.format(currentDate)] = resList
            }

            logger.info("detectOneIndicator resMap: ${Gson().toJson(resMap)}")
            return Right(resMap)
        }
        catch (e: Exception) {
            logger.error("detectOneIndicator codeList: ${Gson().toJson(codeList)}, indicatorName: $indicatorName," +
                    "dateStartStr: $dateStartStr, dateEndStr: $dateEndStr", e)
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
                logger.info("detectOneIndicator currentDate: ${SDF.format(currentDate)}")
                if (!DateValidator.validateDateDetect(SDF.format(currentDate)))
                    continue

                val resList = mutableListOf<String>()
                val listDateNoData = mutableListOf<Date>()
                codeList.forEach {code ->
                    val resDetect = detector.detect(code, multiply, numDateBf, currentDate)
                    logger.info("detectOneIndicator resDetect: ${Gson().toJson(resDetect)}")
                    when (resDetect) {
                        is Left -> {
                            if (resDetect.value == ErrorDefine.NO_EXIST_DATA)
                                listDateNoData.add(currentDate)
                            else
                                logger.info("detectOneIndicator resDetect error $code ${SDF.format(currentDate)}: ${resDetect.value}")
                        }
                        is Right -> {
                            if (resDetect.value.isNotEmpty())
                                resList.addAll(resDetect.value)
                        }
                    }
                }

                if (listDateNoData.isNotEmpty())
                    logger.info("detectNen8 ${Gson().toJson(listDateNoData)}")

                resMap[SDF.format(currentDate)] = resList
            }

            logger.info("detectOneIndicator resMap: ${Gson().toJson(resMap)}")
            return Right(resMap)
        }
        catch (e: Exception) {
            logger.error("detectNen8 codeList: ${Gson().toJson(codeList)}, multiply: $multiply, numDateBf: $numDateBf," +
                    "dateStartStr: $dateStartStr, dateEndStr: $dateEndStr", e)
            return Left(ErrorDefine.FAIL)
        }
    }
}
