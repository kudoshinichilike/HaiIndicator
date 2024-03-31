package com.stock.haiIndicator.dataDAO.dataVDS.entities

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.logger.GLLogger
import utils.roundToTwoDecimal
import java.time.LocalTime
import java.util.Date

/***
 * listMatch: List<OneMatchVDS> is sorted by tradeTime.
 */
data class OneDayVDS(
    val date: Date,
    val code: String,
    val floorCode: String,

    val flrPrice: Double,
    val ceiPrice: Double,
    val refPrice: Double,

    private val originalListMatch: List<OneMatchVDS>,
) {
    val listMatch: List<OneMatchVDS> = originalListMatch.filter { it.matchedPrice != 0.0 }
    val closedPrice: Double
    val openedPrice = calcOpenedPrice()
    val tongKhoiLuong: Long
    val sortedStatisticByPrice: List<StatisticByPrice>
    val changePrice: Double
    val changePercent: Double
    val volATO: Long = calcVolATO()
    val volATC: Long = calcVolATC()
    val volPhien2: Long = calcVolPhien2()
    val higPrice: Double
    val lowPrice: Double
    val lowPricePhien2: Double

    init {
        closedPrice = listMatch.last().matchedPrice
        tongKhoiLuong = listMatch.last().matchedTotalVol

        val matchGroupedByPrice = listMatch.groupBy { it.matchedPrice }
        sortedStatisticByPrice = matchGroupedByPrice.map { (price, elements) ->
            StatisticByPrice(price, elements.sumOf { it.matchedVol.toLong() })
        }

        changePrice = listMatch.last().matchedChange - refPrice
        changePercent = (changePrice / refPrice).roundToTwoDecimal()

        higPrice = listMatch.maxOf { it.matchedPrice }
        lowPrice = listMatch.minOf { it.matchedPrice }
        lowPricePhien2 = listMatch.filter { it.isInPhien2() }.minOf { it.matchedPrice }
    }

    fun calcVolATO(): Long {
        return listMatch.filter { it.isInATO() }.sumOf { it.matchedVol.toLong() }
    }

    fun calcVolATC(): Long {
        return listMatch.filter { it.isInATC() }.sumOf { it.matchedVol.toLong() }
    }

    fun calcVolPhien2(): Long {
        return tongKhoiLuong - volATO - volATC
    }

    fun calcOpenedPrice(): Double {
        val match = findFistMatchAfterTime("09:14:59")
            ?: throw Exception("can not calc openedPrice code: $code, date: ${ConstDefine.SDF.format(date)} ")

        return match.matchedPrice
    }

    /***
     * timeStr: formatted hh:MM:ss
     */
    fun findFistMatchAfterTime(timeStr: String): OneMatchVDS? {
        val timeInput = LocalTime.parse(timeStr)
        return listMatch.firstOrNull { LocalTime.parse(it.tradeTime).isAfter(timeInput) }
    }

    /***
     * timeStr: formatted hh:MM:ss
     */
    fun findLastMatchBeforeTime(timeStr: String): OneMatchVDS? {
        val timeInput = LocalTime.parse(timeStr)
        return listMatch.lastOrNull { LocalTime.parse(it.tradeTime).isBefore(timeInput) }
    }

    fun calcKLUpperPriceUnbound(inputPrice: Double): Long {
        return sortedStatisticByPrice.filter { it.price > inputPrice }.sumOf { it.vol }
    }

    fun percentKLUpperPriceUnbound(inputPrice: Double): Double {
        GLLogger.oneDayLogger.info("kl: ${calcKLUpperPriceUnbound(inputPrice).toDouble()} / $tongKhoiLuong")
        return calcKLUpperPriceUnbound(inputPrice).toDouble() / tongKhoiLuong
    }

    fun calcKLLowerPriceUnbound(inputPrice: Double): Long {
        return sortedStatisticByPrice.filter { it.price < inputPrice }.sumOf { it.vol }
    }

    fun percentKLLowerPriceUnbound(inputPrice: Double): Double {
        return calcKLLowerPriceUnbound(inputPrice).toDouble() / tongKhoiLuong
    }

    fun calcKLEqualPrice(inputPrice: Double): Long {
        return sortedStatisticByPrice.filter { it.price == inputPrice }.sumOf { it.vol }
    }

    fun percentKLEqualPrice(inputPrice: Double): Double {
        GLLogger.oneDayLogger.info("percentKLEqualPriceUnbound ${calcKLEqualPrice(inputPrice).toDouble()} / $tongKhoiLuong")
        return calcKLEqualPrice(inputPrice).toDouble() / tongKhoiLuong
    }
}