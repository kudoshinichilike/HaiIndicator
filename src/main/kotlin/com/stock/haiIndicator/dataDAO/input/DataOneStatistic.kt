package com.stock.haiIndicator.dataDAO.input

import kotlinx.serialization.Serializable

@Serializable
data class DataOneStatistic(
    val Gia: Double,
    var KhoiLuong: Int,
    val TyTrong: Double,
)