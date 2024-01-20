package com.stock.haiIndicator.dataDAO.queryData

import com.stock.haiIndicator.logger.GlobalLogger
import io.ktor.client.statement.*
import utils.HttpUtilsKtor

/***
 * https://msh-devappdata.cafef.vn/rest-api/api/v1/MatchPrice?symbol=DIG&date=20231006
 * https://msh-appdata.cafef.vn/rest-api/api/v1/MatchPrice?symbol=DIG&date=20231006
 * https://s.cafef.vn/Ajax/PageNew/DataHistory/KhopLenh/DataKhopLenh.ashx
 */
object QueryData {
//    const val URL = "https://s.cafef.vn/Ajax/PageNew/DataHistory/KhopLenh/DataKhopLenh.ashx"
    const val URL = "https://msh-appdata.cafef.vn/rest-api/api/v1/MatchPrice"

    /***
     * date: format yyyy-MM-dd
     */
    suspend fun query(code: String, date: String): String {
        val params = createBodyParams(code, date)
        val response = HttpUtilsKtor.get(URL, params)
        GlobalLogger.logger.debug("queryData response ${response.bodyAsText()}")
        return response.bodyAsText()
    }

    private fun createBodyParams(code: String, date: String): Map<String, String> {
        return mutableMapOf(
            "symbol" to code,
            "date" to date
        )
    }
}