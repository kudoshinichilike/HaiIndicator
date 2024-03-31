package com.stock.haiIndicator.define.detectConfig

import utils.JsonUtils

object CodeConfig {
    private val majorData: List<MajorData>
    val codeList = mutableSetOf<String> ()

    private val listCodeInfoVDS: List<CodeInfoVDS>
    val codeListVds: List<String>
    init {
        majorData = JsonUtils.decodeFromFile("/config/json/CodeDefine.json")
        majorData.forEach {
            codeList.addAll(it.code.keys)
        }

        listCodeInfoVDS = JsonUtils.decodeFromFile("/config/json/CodeDefineVDS.json")
        codeListVds = listCodeInfoVDS.map { it.code }
    }

    fun containsCode(code: String): Boolean {
        return codeList.contains(code)
    }

    fun containsCodeVDS(code: String): Boolean {
        return codeList.contains(code)
    }
}