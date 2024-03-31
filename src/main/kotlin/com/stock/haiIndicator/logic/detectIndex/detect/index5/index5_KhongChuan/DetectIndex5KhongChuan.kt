package com.stock.haiIndicator.logic.detectIndex.detect.index5.index5_KhongChuan

import com.google.gson.Gson
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.logic.cacheStore.ResultStore
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.logic.detectIndex.detect.IDetectIndex
import com.stock.haiIndicator.payload.res.resEachIndex.ResDetect5DetailInfo
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*
import kotlin.math.max
import kotlin.math.min

object DetectIndex5KhongChuan: IDetectIndex {
    private const val TEST_LOWEST_PRICE_THREAD = 0.950
    private const val TEST_LOWEST_VOL_THREAD = 0.2

    fun detect(code: String, date: Date, data: DataOneDay): Pair<Boolean, SealedResDetect> {
        if (!isValidShape(data))
            return Pair(false, SealedResDetect())

        val aKL = percentAKL(data)
        val bKL = percentBKL(data)
        val cKL = 1 - aKL - bKL

        val testKL = percentTestVol(data)
        val cntHappenLowestPrice = calcCntHappenLowestPrice(data)
        GLLogger.detectLogger.info("------------- DetectIndex5 aKL: $aKL \t bKL: $bKL \t cKL: $cKL \t testKL: $testKL," +
                "\t cntHappenLowestPrice: $cntHappenLowestPrice")

        val con1 = aKL <= 0.1
        val con2 = bKL >= 0.1
        val con3 = cKL in 0.60..0.85
        val con4 = testKL <= TEST_LOWEST_VOL_THREAD
        val resBoolean = con1 && con2 && con3

        if (resBoolean)
            ResultStore.addResult(date, code, DefineDetector.getEnumFromDetector(this)!!)

        val resDetailed = ResDetect5DetailInfo(aKL, bKL, cKL, testKL, cntHappenLowestPrice)
        return Pair(resBoolean, resDetailed)
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        val con1 = data.GiaCaoNhat > data.GiaMoCua
//        val con2 = data.GiaMoCua >= data.GiaDongCua
        val con3 = data.GiaDongCua > data.GiaThapNhat
        val con4 = (data.GiaThapNhat / data.GiaThamChieu) < TEST_LOWEST_PRICE_THREAD
        return  con1 && con3 && con4
    }

    private fun percentAKL(data: DataOneDay): Double {
        val priceCompare = max(data.GiaMoCua, data.GiaDongCua)
        return data.percentKLUpperPriceUnbound(priceCompare)
    }

    private fun percentBKL(data: DataOneDay): Double {
        val priceCompare = min(data.GiaMoCua, data.GiaDongCua)
        return data.percentKLLowerPriceUnbound(priceCompare)
    }

    private fun percentTestVol(data: DataOneDay): Double {
        return data.percentKLEqualPrice(data.GiaThapNhat)
    }

    private fun calcCntHappenLowestPrice(data: DataOneDay): Int {
        var listMatch = data.DlChiTiet.filter { it.isInPhien2() }.toMutableList()
        var firstMatchIdx = listMatch.indexOfFirst { it.Gia == data.GiaThapNhat }
        var resCount = 0

        while (firstMatchIdx != -1) {
            GLLogger.detectLogger.info("firstMatchIdx: $firstMatchIdx, ${Gson().toJson(listMatch[firstMatchIdx])}")
            resCount ++
            var lastSublistIdx = firstMatchIdx
            while (lastSublistIdx < listMatch.size && listMatch[lastSublistIdx].Gia == data.GiaThapNhat)  {
                GLLogger.detectLogger.info("lastSublistIdx: $lastSublistIdx, ${Gson().toJson(listMatch[lastSublistIdx])}")
                lastSublistIdx ++
            }

            if (lastSublistIdx == listMatch.size)
                break
            else {
                listMatch = listMatch.subList(lastSublistIdx, listMatch.size)
                firstMatchIdx = listMatch.indexOfFirst { it.Gia == data.GiaThapNhat }
            }
        }

        return resCount
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        return Left(ErrorDefine.FAIL)
//        val resultFromSuper = super.detect(code, date)
//        if (resultFromSuper is Right)
//            return resultFromSuper
//
//        if (!date.before(ConstDefine.DATE_START_VDS))
//            return DetectIndex5KhongChuanVDS.detect(code, date)
//
//        val dateStr = ConstDefine.SDF.format(date)
//        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
//        return Right(detect(code, date, data))
    }
}