package com.stock.haiIndicator.payload.res.resEachIndex

data class ResIndex2 (
    val percentAKL: Float,
    val multiplyKLBf: Float,
    val timeBreakKL: List<ResIndex8DetailInfo>
) : SealedResIndex()