package com.stock.haiIndicator.dataDAO.codeList

import com.stock.haiIndicator.define.EnumFloor
import com.stock.haiIndicator.define.detectConfig.CodeInfoVDS
import io.ktor.client.statement.*
import kotlinx.serialization.json.jsonObject
import utils.HttpUtilsKtor
import utils.JsonUtils

object CodeListDAO {
    private const val URL = "https://livedragon.haistock.pro/api/v1/stockList"
    suspend fun getCodeListFromVDS(): List<String> {
        val response = HttpUtilsKtor.get(URL, emptyMap())
        val jsonRes = JsonUtils.parseToJsonElement(response.bodyAsText()).jsonObject
        val jsonCodeList = jsonRes.getValue("data").jsonObject.getValue("data").toString()
        val codeList: List<CodeInfoVDS> = JsonUtils.decodeFromString(jsonCodeList)
        return codeList.map { it.code }
    }

    suspend fun getCodeListFromVDS(floor: EnumFloor): List<String> {
        val response = HttpUtilsKtor.get(URL, emptyMap())
        val jsonRes = JsonUtils.parseToJsonElement(response.bodyAsText()).jsonObject
        val jsonCodeList = jsonRes.getValue("data").jsonObject.getValue("data").toString()
        val codeList: List<CodeInfoVDS> = JsonUtils.decodeFromString(jsonCodeList)
        return codeList.filter { it.san == floor.name }.map { it.code }
    }
}