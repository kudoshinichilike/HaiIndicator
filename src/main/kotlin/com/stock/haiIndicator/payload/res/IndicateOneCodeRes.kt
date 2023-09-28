package com.stock.haiIndicator.payload.res

data class IndicateOneCodeRes(
    val error: Byte,
    val result: List<String>? = null
)