package com.stock.haiIndicator.define.detectConfig

import kotlinx.serialization.Serializable

@Serializable
data class MajorData(
    val name: String,
    val code: Map<String, String>
)