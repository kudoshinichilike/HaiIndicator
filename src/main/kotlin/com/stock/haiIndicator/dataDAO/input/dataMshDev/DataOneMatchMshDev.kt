package com.stock.haiIndicator.dataDAO.input.dataMshDev

import com.stock.haiIndicator.dataDAO.input.DataOneMatch
import kotlinx.serialization.Serializable
import java.text.SimpleDateFormat
import java.util.*

/***
 * tradeDate format: 2023-10-12T14:45:01+07:00
 *
 * volume * 1000 se ra kl dung khi giao dich
 */
@Serializable
data class DataOneMatchMshDev(
    val symbol: String,
    val tradeDate: String,
    val basicPrice: Float,
    var price: Float,
    var volume: Float,
    var totalVolume: Float,
    val totalValue: Float,
) {
    fun convertToDataOneMatch(): DataOneMatch {
        return DataOneMatch(
            tradeDate,
            price,
            volume * 100,
            totalVolume * 100,
        )
    }
}