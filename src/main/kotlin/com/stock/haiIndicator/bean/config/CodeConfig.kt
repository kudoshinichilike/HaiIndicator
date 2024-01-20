package com.stock.haiIndicator.bean.config

import utils.JsonUtils

object CodeConfig {
    private val majorData: List<MajorData>
    val codeList = mutableSetOf<String> ()
    init {
        majorData = JsonUtils.decodeFromFile("config/CodeDefine.json")
        majorData.forEach {
            codeList.addAll(it.code.keys)
        }
    }

    fun containsCode(code: String): Boolean {
        return codeList.contains(code)
    }
}