package com.stock.haiIndicator.dataDAO.input

import kotlinx.serialization.Serializable
import kotlin.math.ceil

@Serializable
data class DataOneMatch(
    val ThoiGian: String,
    val Gia: Float,
    val GiaThayDoi: String,
    var KLLo: Float,
    var KLTichLuy: Float,
    val TiTrong: String,
) {
    init {
        KLTichLuy = ceil(KLTichLuy)
        KLLo = ceil(KLLo)

    }
}