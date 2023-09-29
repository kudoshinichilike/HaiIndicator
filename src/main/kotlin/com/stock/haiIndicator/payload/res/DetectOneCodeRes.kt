package com.stock.haiIndicator.payload.res

data class DetectOneCodeRes(
    val error: Byte,
    val result: Map<String, List<String>>? = null
)