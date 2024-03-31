package com.stock.haiIndicator.payload.res

import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect

data class DetectOneIndicatorRes(
    val error: Byte,
    val resultDetailed: Map<String, List<Pair<String, SealedResDetect>>>? = null, //<date, <code, data>>
    val result: Map<String, List<String>>? = resultDetailed?.mapValues { pairValue -> pairValue.value.map { it.first } }
)