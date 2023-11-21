package com.stock.haiIndicator.payload.res

data class Nen8Res(
    val error: Byte,
    val result: Map<String, List<String>>? = null
)