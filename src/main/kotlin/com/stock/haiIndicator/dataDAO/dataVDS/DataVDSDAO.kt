package com.stock.haiIndicator.dataDAO.dataVDS

import com.stock.haiIndicator.dataDAO.dataVDS.entities.OneDayVDS
import com.stock.haiIndicator.dataDAO.queryData.QueryData
import io.ktor.client.statement.*
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import utils.HttpUtilsKtor
import utils.JsonUtils

/***
 * URL from anh Kelvin
 * https://livedragon.haistock.pro/api/v1/intradaySearch?stockCode=HAG&boardDate=27/10/2023
 * date: format dd/MM/yyyy
 */
object DataVDSDAO {
    const val URL = "https://livedragon.haistock.pro/api/v1/intradaySearch"

    suspend fun getDataOneDay(code: String, dateStr: String): OneDayVDS? {
        val turnTry = 5
        for (i in 1..turnTry) {
            val resQuery = query(code, dateStr)
            val oneDayVDS = convertResQuery2ResFormat(resQuery)
            if (oneDayVDS != null)
                return oneDayVDS
        }

        return null
    }

    private fun convertResQuery2ResFormat(resQuery: String): OneDayVDS? {
        return try {
            val jsonObject = JsonUtils.parseToJsonElement(resQuery).jsonObject
            if(jsonObject.getValue("success").jsonPrimitive.booleanOrNull == true) {
                val resFormatted: OneDayVDS = JsonUtils.decodeFromString(jsonObject.getValue("list").toString())
                resFormatted
            } else
                null
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    private suspend fun query(code: String, date: String): String {
        val params = createBodyParams(code, date)
        val response = HttpUtilsKtor.get(QueryData.URL, params)
        println("DataVDSDAO code = $code, date = $date => response: \n ${response.bodyAsText()}")
        return response.bodyAsText()
    }

    private fun createBodyParams(code: String, date: String): Map<String, String> {
        return mutableMapOf(
            "stockCode" to code,
            "boardDate" to date
        )
    }
}