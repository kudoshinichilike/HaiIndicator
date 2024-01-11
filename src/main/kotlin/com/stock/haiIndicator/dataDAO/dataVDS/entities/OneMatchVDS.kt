package com.stock.haiIndicator.dataDAO.dataVDS.entities

data class OneMatchVDS(
    val _id: String,
    val Code: String,
    val FloorCode: String,
    val TradeTime: String,
    val AmPm: String,

    val FlrPrice: Double,
    val CeiPrice: Double,
    val RefPrice: Double,

    val HigPrice: Double,
    val LowPrice: Double,
    val AvgPrice: Double,

    val MatchedPrice: Double,
    val MatchedChange: Double,
    val MatchedVol: Int,
    val MatchedTotalVol: Long,

    val OfferVol1: Int,
    val OfferVol2: Int,
    val OfferVol3: Int,
    val OfferPrice1: Double,
    val OfferPrice2: Double,
    val OfferPrice3: Double,

    val BidVol1: Int,
    val BidVol2: Int,
    val BidVol3: Int,
    val BidPrice1: Double,
    val BidPrice2: Double,
    val BidPrice3: Double,

    val FSellVol: Int,
    val FBuyVol: Int,
) {

}