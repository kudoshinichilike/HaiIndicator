package com.stock.haiIndicator.payload.res.resEachIndex

data class ResDetect5DetailInfo (
    val aKL: Double,
    val bKL: Double,
    val cKL: Double,
    val testKL: Double,
    val cntHappenLowestPrice: Int,
    val lowest: Double = 0.0,
    val speedMatchBf: Double = 0.0, //Tốc độ khớp lệnh trước lần quét đầu tiên
    val speedMatchAfter30Min: List<Double> = emptyList(), //tốc độ khớp lệnh 30ph sau khi quét sàn (khối lượng / 10 giây)
    val compareKLWithMa20: Double = 0.0, //lay KL / ma20
) : SealedResDetect()