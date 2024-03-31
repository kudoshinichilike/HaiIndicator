package com.stock.haiIndicator.define.detectConfig

import kotlinx.serialization.Serializable

@Serializable
data class CodeInfoVDS(
    val code: String = "",
    val fullname_vi: String = "",
    val loaidn: Int,
    val san: String = ""
)
