package com.stock.haiIndicator.dataDAO.dataVDS.entities

import kotlinx.serialization.Serializable

@Serializable
data class DataKLBf (
    val KL20Bf: Long,
    val ATO20Bf: Long,
    val ATC20Bf: Long
) {
    val avgKL = KL20Bf / 20
    val avgATO = ATO20Bf / 20
    val avgATC = ATC20Bf / 20
}