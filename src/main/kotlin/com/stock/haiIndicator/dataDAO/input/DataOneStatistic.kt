package com.stock.haiIndicator.dataDAO.input

import kotlinx.serialization.Serializable
import kotlin.math.ceil
import kotlin.math.round

@Serializable
data class DataOneStatistic(
    val Gia: Float,
    var KhoiLuong: Float,
    val TyTrong: Float,
) {
    init {
        KhoiLuong = round(KhoiLuong)
    }
}