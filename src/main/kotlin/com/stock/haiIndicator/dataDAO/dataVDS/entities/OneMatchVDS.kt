package com.stock.haiIndicator.dataDAO.dataVDS.entities

import utils.TimeUtils

data class OneMatchVDS(
    val tradeTime: String,
    val amPm: String,

    val higPrice: Double,
    val lowPrice: Double,
    val avgPrice: Double,

    val matchedPrice: Double,
    val matchedChange: Double,
    val matchedVol: Int,
    val matchedTotalVol: Long,

    val offerVol1: Int,
    val offerVol2: Int,
    val offerVol3: Int,
    val offerPrice1: Double,
    val offerPrice2: Double,
    val offerPrice3: Double,

    val bidVol1: Int,
    val bidVol2: Int,
    val bidVol3: Int,
    val bidPrice1: Double,
    val bidPrice2: Double,
    val bidPrice3: Double,

    val fSellVol: Int,
    val fBuyVol: Int,
) {
    fun isInATO(): Boolean {
        return TimeUtils.isTimeInRange(tradeTime, "00:00:00", "09:15:00")
    }

    fun isInATC(): Boolean {
        return TimeUtils.isTimeInRange(tradeTime, "14:30:00", "23:59:59")
    }

    fun isInPhien2(): Boolean {
        return TimeUtils.isTimeInRange(tradeTime, "09:15:01", "14:29:59")
    }
}