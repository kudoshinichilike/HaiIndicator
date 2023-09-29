package com.stock.haiIndicator.payload.res

data class DetectOneIndicatorRes(
    val error: Byte,
    val result: Map<String, List<String>>? = null
)