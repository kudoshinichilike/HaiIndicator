package com.stock.haiIndicator.dataDAO.input

import kotlinx.serialization.Serializable
import kotlin.math.ceil
import kotlin.math.round

@Serializable
data class DataOneMatch(
    val ThoiGian: String,
    val Gia: Float,
    var KLLo: Float,
    var KLTichLuy: Float,
)