package com.stock.haiIndicator.dataDAO

import FileReader
import FileWriter
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.dataDAO.queryData.QueryData
import com.stock.haiIndicator.payload.res.ResMatchData
import kotlinx.serialization.json.jsonObject
import utils.JsonUtils

object DAO {
    suspend fun getDataOneDay(code: String, dateStr: String): DataOneDay? {
        return getDataOneDayLocal(code, dateStr) ?: getDataOneDayCafeF(code, dateStr)
    }

    private fun getDataOneDayLocal(code: String, dateStr: String): DataOneDay? {
        return FileReader.readDataOneDay(code, dateStr)
    }

    private suspend fun getDataOneDayCafeF(code: String, dateStr: String): DataOneDay? {
        try {
            val strData = QueryData.query(code, dateStr)
            val jsonData = JsonUtils.parseToJsonElement(strData).jsonObject
            val data: DataOneDay = JsonUtils.decodeFromString(jsonData["Data"].toString())
            val isValidData = normalizeDataFromCafeF(data)
            return if(isValidData) {
                saveDataToLocal(code, dateStr, data)
                data
            } else
                null
        }
        catch (e: Exception) {
            println("getDataOneDayCafeF Exception $code $dateStr")
            return null
        }
    }

    suspend fun getMatchData(code: String, dateStr: String): List<ResMatchData>? {
        return getMatchDataLocal(code, dateStr) ?: getMatchDataCafeF(code, dateStr)
    }

    private fun getMatchDataLocal(code: String, dateStr: String): List<ResMatchData>? {
        val dataOneDayLocal = FileReader.readDataOneDay(code, dateStr) ?: return null
        return convertToDataResponse(dataOneDayLocal)
    }

    private suspend fun getMatchDataCafeF(code: String, dateStr: String): List<ResMatchData>? {
        var resData: List<ResMatchData>? = null
        try {
            val strData = QueryData.query(code, dateStr)
            val jsonData = JsonUtils.parseToJsonElement(strData).jsonObject
            val data: DataOneDay = JsonUtils.decodeFromString(jsonData["Data"].toString())
            val isValidData = normalizeDataFromCafeF(data)
            if(isValidData) {
                saveDataToLocal(code, dateStr, data)
                resData = convertToDataResponse(data)
            }
        }
        catch (e: Exception) {
            e.printStackTrace()
        }

        return resData
    }

    private fun saveDataToLocal(code: String, date: String, data: DataOneDay) {
        FileWriter.writeDataOneDay(code, date, data)
    }

    private fun normalizeDataFromCafeF(data: DataOneDay): Boolean {
        return !(data.DlChiTiet.isEmpty() || data.DlTongHop.isEmpty())
    }

    private fun convertToDataResponse(data: DataOneDay): List<ResMatchData> {
        return data.DlChiTiet.map {
            ResMatchData(it.ThoiGian, it.Gia, it.GiaThayDoi, it.KLLo, it.KLTichLuy, it.TiTrong)
        }.toList()
    }
}