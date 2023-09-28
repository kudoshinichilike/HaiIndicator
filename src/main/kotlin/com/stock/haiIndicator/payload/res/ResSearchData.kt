package com.stock.haiIndicator.payload.res

data class ResSearchData(
    val error: Byte,
    val matchData: List<ResMatchData>? = null
)

data class ResMatchData(
    val time: String,
    val price: Float,
    val changePrice: String,
    val matchVolume: Float,
    val accumulatedVolume: Float,
    val proportion: String,
)