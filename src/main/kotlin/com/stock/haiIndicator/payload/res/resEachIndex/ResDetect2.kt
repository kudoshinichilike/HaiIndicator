package com.stock.haiIndicator.payload.res.resEachIndex

data class ResDetect2 (
    val percentAKL: Double,
    val multiplyKLBf: Float,
    val timeBreakKL: List<ResDetect8DetailInfo>
) : SealedResDetect()