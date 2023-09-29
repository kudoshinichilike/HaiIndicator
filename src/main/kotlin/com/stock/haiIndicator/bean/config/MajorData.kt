package com.stock.haiIndicator.bean.config

import kotlinx.serialization.Serializable

@Serializable
data class MajorData(
    val name: String,
    val code: Map<String, String>
)