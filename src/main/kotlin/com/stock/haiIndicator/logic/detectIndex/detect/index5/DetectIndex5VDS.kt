package com.stock.haiIndicator.logic.detectIndex.detect.index5

import com.google.gson.Gson
import com.stock.haiIndicator.dataDAO.dataVDS.DataVDSDAO
import com.stock.haiIndicator.dataDAO.dataVDS.entities.OneDayVDS
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.logic.cacheStore.ResultStore
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.logic.detectIndex.detect.IDetectIndex
import com.stock.haiIndicator.payload.res.resEachIndex.ResDetect5DetailInfo
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*
import kotlin.math.max
import kotlin.math.min

/***
 * CntHappenLowestPrice tạm không để điều kiện. Hiển thị số lần lên.
 * Còn điều kiện phải xảy ra trong phiên 2
 *
 * nen nay lam them phan tinh khoi luong gia san de quet duoc san
 *
 * PET 14/11/2023 , aKL không đạt
 * cKL ~ 80% là gì
 * b là đoạn dưới hay phần đạp sàn
 *
 */
object DetectIndex5VDS: IDetectIndex {
    private const val TEST_LOWEST_PRICE_THREAD = 0.950
    private const val TEST_LOWEST_VOL_THREAD = 0.2

    fun detect(code: String, date: Date, data: OneDayVDS): Pair<Boolean, SealedResDetect> {
        if (!isValidShape(data))
            return Pair(false, SealedResDetect())

        val aKL = percentAKL(data)
        val bKL = percentBKL(data)
        val cKL = 1 - aKL - bKL

        val testKL = percentTestVol(data)
        val cntHappenLowestPrice = calcCntHappenLowestPrice(data)
        GLLogger.detectLogger.info("------------- DetectIndex5 aKL: $aKL \n bKL: $bKL \n cKL: $cKL \n testKL: $testKL," +
                "cntHappenLowestPrice: $cntHappenLowestPrice")

        val con1 = aKL <= 0.1
        val con2 = bKL >= 0.1
        val con3 = cKL in 0.60..0.85
        val con4 = testKL <= TEST_LOWEST_VOL_THREAD
        val con5 = cntHappenLowestPrice == 1
        val resBoolean = con1 && con2 && con3 && con4 && con5
        if (resBoolean)
            ResultStore.addResult(date, code, DefineDetector.getEnumFromDetector(this)!!)

        val resDetailed = ResDetect5DetailInfo (aKL, bKL, cKL, testKL, cntHappenLowestPrice,
            data.lowPricePhien2 / data.refPrice)
        return Pair(resBoolean, resDetailed)
    }

    private fun isValidShape(data: OneDayVDS): Boolean {
        val con1 = data.higPrice > data.openedPrice
//        val con2 = data.openedPrice >= data.closedPrice
        val con3 = data.closedPrice > data.lowPricePhien2
        val con4 = (data.lowPricePhien2 / data.refPrice) < TEST_LOWEST_PRICE_THREAD
        val con5 = ((data.closedPrice / data.lowPricePhien2) - 1) >= 0.025
        return  con1 && con3 && con4 && con5
    }

    private fun percentAKL(data: OneDayVDS): Double {
        val priceCompare = max(data.openedPrice, data.closedPrice)
        return data.percentKLUpperPriceUnbound(priceCompare)
    }

    private fun percentBKL(data: OneDayVDS): Double {
        val priceCompare = min(data.openedPrice, data.closedPrice)
        return data.percentKLLowerPriceUnbound(priceCompare)
    }

    private fun percentTestVol(data: OneDayVDS): Double {
        return data.percentKLEqualPrice(data.lowPricePhien2)
    }

    private fun calcCntHappenLowestPrice(data: OneDayVDS): Int {
        var listMatch = data.listMatch.filter { it.isInPhien2() }.toMutableList()
        var firstMatchIdx = listMatch.indexOfFirst { it.matchedPrice == data.lowPricePhien2 }
        var resCount = 0

        while (firstMatchIdx != -1) {
            GLLogger.detectLogger.info("firstMatchIdx: $firstMatchIdx, ${Gson().toJson(listMatch[firstMatchIdx])}")
            resCount ++
            var lastSublistIdx = firstMatchIdx
            while (lastSublistIdx < listMatch.size && listMatch[lastSublistIdx].matchedPrice == data.lowPricePhien2)  {
                GLLogger.detectLogger.info("lastSublistIdx: $lastSublistIdx, ${Gson().toJson(listMatch[lastSublistIdx])}")
                lastSublistIdx ++
            }

            if (lastSublistIdx == listMatch.size)
                break
            else {
                listMatch = listMatch.subList(lastSublistIdx, listMatch.size)
                firstMatchIdx = listMatch.indexOfFirst { it.matchedPrice == data.lowPricePhien2 }
            }
        }

        return resCount
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        val resultFromSuper = super.detect(code, date)
        if (resultFromSuper is Right)
            return resultFromSuper

        val dateStr = ConstDefine.SDF.format(date)
        GLLogger.detectLogger.info("DetectIndex5 code: $code \n date: $dateStr")
        val data = DataVDSDAO.getDataOneDay(code, date) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(detect(code, date, data))
    }
}