package com.stock.haiIndicator.dataDAO.input.dataMshDev

import com.stock.haiIndicator.dataDAO.input.DataOneStatistic
import kotlinx.serialization.Serializable
import kotlin.math.round

@Serializable
data class DataOneStatisticMshDev(
    val price: Float,
    var totalVolume: Float,
    val volPercent: Float,
) {
    init {
        totalVolume = round(totalVolume)
    }

    fun convertToDataOneStatistic(): DataOneStatistic {
        return DataOneStatistic(
            price,
            totalVolume * 100,
            volPercent,
        )
    }
}