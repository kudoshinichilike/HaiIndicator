package com.stock.haiIndicator.dataDAO.dataVDS

import com.stock.haiIndicator.dataDAO.dataVDS.entities.OneDayVDS
import com.stock.haiIndicator.dataDAO.dataVDS.entities.OneMatchVDS
import com.stock.haiIndicator.dataDAO.dataVDS.transparentEntities.OneMatchVDSAfterGet
import com.stock.haiIndicator.dataDAO.queryData.QueryData
import com.stock.haiIndicator.define.ConstDefine
import io.ktor.client.plugins.*
import io.ktor.client.statement.*
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.hibernate.type.SerializationException
import org.slf4j.LoggerFactory
import utils.HttpUtilsKtor
import utils.JsonUtils
import java.util.Date
import kotlin.math.log

/***
 * URL from anh Kelvin
 * https://livedragon.haistock.pro/api/v1/intradaySearch?stockCode=HAG&boardDate=27/10/2023
 * date: format dd/MM/yyyy
 */
object DataVDSDAO {
    private val logger = LoggerFactory.getLogger(this.javaClass.name)
    const val URL = "https://livedragon.haistock.pro/api/v1/intradaySearch"

    suspend fun getDataOneDay(code: String, date: Date): OneDayVDS? {
        val dateStr = ConstDefine.SDF_VDS.format(date)
        val turnTry = 1
        for (i in 1..turnTry) {
            try {
                val resQuery = query(code, dateStr)
                val oneDayVDS = convertResQuery2ResFormat(resQuery, code, date)
                if (oneDayVDS != null)
                    return oneDayVDS
            }
            catch (_: Exception) { }
        }

        logger.error("Cannot get data $code $dateStr")
        return null
    }

    private fun convertResQuery2ResFormat(resQuery: String, code: String, date: Date): OneDayVDS? {
        return try {
            val jsonObject = JsonUtils.parseToJsonElement(resQuery).jsonObject
            if(jsonObject.isEmpty() || jsonObject.containsKey("errors"))
                return null

            if(jsonObject.getValue("success").jsonPrimitive.booleanOrNull == true) {
                val listMatch: List<OneMatchVDSAfterGet> =
                    JsonUtils.decodeFromString(jsonObject.getValue("list").toString())
                if (listMatch.isEmpty())
                    return null

                OneDayVDS(
                    date,
                    listMatch[0].Code,
                    listMatch[0].FloorCode,
                    listMatch[0].FlrPrice,
                    listMatch[0].CeiPrice,
                    listMatch[0].RefPrice,
                    listMatch.map {it.toOneMatchVDS() }
                )
            } else
                null
        }
        catch (_: Exception) {
            logger.error("convertResQuery2ResFormat FAIL $code ${ConstDefine.SDF_VDS.format(date)}")
            null
        }
    }

    private suspend fun query(code: String, date: String): String {
        try {
            val params = createBodyParams(code, date)
            val response = HttpUtilsKtor.get(URL, params)
            logger.info("DataVDSDAO code = $code, date = $date")
//        logger.info("=> response: \n ${response.bodyAsText()}")
            return response.bodyAsText()
        }
//        catch (e: HttpRequestTimeoutException) {
//            throw e
//        }
        catch (e: Exception) {
            logger.error("fail query code = $code, date = $date")
            return ""
        }
    }

    private fun createBodyParams(code: String, date: String): Map<String, String> {
        return mutableMapOf(
            "stockCode" to code,
            "boardDate" to date
        )
    }
}