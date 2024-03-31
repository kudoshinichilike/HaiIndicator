package com.stock.haiIndicator.payload.res

import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect

data class DetectOneCodeRes(
    val error: Byte,
    val resultDetailed: Map<String, List<Pair<String, SealedResDetect>>>? = null, //<indexName, <date, resDetail>>
    val result: Map<String, List<String>>? = resultDetailed?.mapValues { pairValue -> pairValue.value.map { it.first } }
)