package com.stock.haiIndicator.payload.res.resEachIndex

data class ResDetect8DetailInfo (
    val time: String,
    val multiplyKLBf: Float,
    val KL: Long,
    val avgPrice: Float,
) : SealedResDetect()