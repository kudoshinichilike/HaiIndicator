package com.stock.haiIndicator.define.detectConfig

import utils.JsonUtils

object CodeConfigVDS {
    private val listCodeInfo: List<CodeInfoVDS>
    val codeList: List<String>
    init {
        listCodeInfo = JsonUtils.decodeFromFile("/config/json/CodeDefineVDS.json")
        val listErrCode: List<String> = JsonUtils.decodeFromFile("/config/json/errDataCode")
        codeList = listCodeInfo.filter { it.code.length == 3 && !listErrCode.contains(it.code) }
                                .map { it.code }
    }

    fun containsCode(code: String): Boolean {
        return codeList.contains(code)
    }
}