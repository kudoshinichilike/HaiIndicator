package com.stock.haiIndicator.dataDAO.input.dataMshDev

import com.stock.haiIndicator.dataDAO.input.DataOneDay
import kotlinx.serialization.Serializable

@Serializable
data class DataOneDayMshDev(
    val data: List<DataOneMatchMshDev>,
    val aggregates: List<DataOneStatisticMshDev>,
) {
    fun convertToDataOneDay(): DataOneDay {
        return DataOneDay(
            data[0].basicPrice,
            data.reversed().map { it.convertToDataOneMatch() },
            aggregates.map { it.convertToDataOneStatistic() },
        )
    }
}