package com.stock.haiIndicator.dataDAO.queryData

import io.ktor.client.statement.*
import utils.HttpUtilsKtor

object QueryData {
    const val URL = "https://s.cafef.vn/Ajax/PageNew/DataHistory/KhopLenh/DataKhopLenh.ashx"

    /***
     * date: format yyyy-MM-dd
     */
    suspend fun query(code: String, date: String): String {
        val bodyPost = createBodyPost(code, date)
        val response = HttpUtilsKtor.sendPostJson(URL, bodyPosts)
        println("queryData response ${response.bodyAsText()}")
        return response.bodyAsText()
    }

    private fun createBodyPost(code: String, date: String): Map<String, String> {
        return mutableMapOf(
            "Symbol" to code,
            "Date" to date
        )
    }
}