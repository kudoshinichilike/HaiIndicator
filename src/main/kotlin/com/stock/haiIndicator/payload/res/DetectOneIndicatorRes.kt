package com.stock.haiIndicator.payload.res

import com.stock.haiIndicator.payload.res.resEachIndex.SealedResIndex

data class DetectOneIndicatorRes(
    val error: Byte,
    val result: Map<String, List<Pair<String, SealedResIndex>>>? = null
)