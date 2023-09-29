package com.stock.haiIndicator.dataDAO.queryData

import io.ktor.client.statement.*
import utils.HttpUtilsKtor

object QueryData {
    const val URL = "https://s.cafef.vn/Ajax/PageNew/DataHistory/KhopLenh/DataKhopLenh.ashx"

    /***
     * date: format yyyy-MM-dd
     */
    suspend fun query(code: String, date: String): String {
        val params = createBodyParams(code, date)
        val response = HttpUtilsKtor.get(URL, params)
        println("queryData response ${response.bodyAsText()}")
        return response.bodyAsText()
    }

    private fun createBodyParams(code: String, date: String): Map<String, String> {
        return mutableMapOf(
            "Symbol" to code,
            "Date" to date
        )
    }
}