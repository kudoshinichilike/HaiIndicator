package com.stock.haiIndicator.define.detectConfig

import utils.JsonUtils

object CodeConfigVDS {
    private val listCodeInfo: List<CodeInfoVDS>
    private val mapCodeInfo: Map<String, CodeInfoVDS>
    val codeList: List<String>
    init {
        listCodeInfo = JsonUtils.decodeFromFile("/config/json/CodeDefineVDS.json")
        val listErrCode: List<String> = JsonUtils.decodeFromFile("/config/json/errDataCode")
        mapCodeInfo = listCodeInfo.associateBy { it.code }
        codeList = listCodeInfo.filter {
                                    it.code.length == 3 && !listErrCode.contains(it.code)
                                            && it.validSan()
                                }
                                .map { it.code }
    }

    fun containsCode(code: String): Boolean {
        return codeList.contains(code)
    }

    fun haveATO(code: String): Boolean {
        return mapCodeInfo.getValue(code).san == FloorEnum.HOSE.str
    }

    fun haveATC(code: String): Boolean {
        return mapCodeInfo.getValue(code).san == FloorEnum.HOSE.str
                || mapCodeInfo.getValue(code).san == FloorEnum.HNX.str
    }

    fun validVolume(code: String): Boolean {
        TODO("phuong: chi lay cac ma co thanh khoan cao chut")
    }
}