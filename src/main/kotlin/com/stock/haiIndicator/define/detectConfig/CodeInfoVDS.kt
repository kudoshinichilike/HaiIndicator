package com.stock.haiIndicator.define.detectConfig

import kotlinx.serialization.Serializable

@Serializable
data class CodeInfoVDS(
    val code: String = "",
    val fullname_vi: String = "",
    val loaidn: Int,
    val san: String = ""
) {
    fun validSan(): Boolean {
        return san == FloorEnum.HNX.str || san == FloorEnum.HOSE.str || san == FloorEnum.UPCOM.str
    }
}
