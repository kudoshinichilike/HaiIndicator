package com.stock.haiIndicator.dataDAO

import FileReader
import FileWriter
import com.google.gson.Gson
import com.stock.haiIndicator.bean.ConstDefine
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.dataDAO.input.dataMshDev.DataOneDayMshDev
import com.stock.haiIndicator.dataDAO.queryData.QueryData
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.JsonObject
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
//            val dateCafeF = ConstDefine.SDF_cafeF.format(ConstDefine.SDF.parse(dateStr))
            val dateCafeF = ConstDefine.SDF_cafeF.format(ConstDefine.SDF.parse(dateStr)).replace("-", "") //mshDev
            val strData = QueryData.query(code, dateCafeF)
//            val jsonData = JsonUtils.parseToJsonElement(strData).jsonObject
//            val data: DataOneDay = JsonUtils.decodeFromString(jsonData["Data"].toString())
            val jsonData = convertFromMshDevappdata(JsonUtils.parseToJsonElement(strData).jsonObject)  //mshDev
            val data: DataOneDay = JsonUtils.decodeFromString(jsonData.toString())  //mshDev
            val isValidData = normalizeDataFromCafeF(data)
            return if(isValidData) {
                saveDataToLocal(code, dateStr, data)
                data
            } else
                null
        }
        catch (e: Exception) {
//            e.printStackTrace()
            println("getDataOneDayCafeF Exception $code $dateStr")
            return null
        }
    }

    private fun saveDataToLocal(code: String, date: String, data: DataOneDay) {
        FileWriter.writeDataOneDay(code, date, data)
    }

    private fun normalizeDataFromCafeF(data: DataOneDay): Boolean {
        return !(data.DlChiTiet.size <= 5 || data.DlTongHop.isEmpty())
    }

    private fun convertFromMshDevappdata(jsonObject: JsonObject): JsonObject {
        val dataMsh: DataOneDayMshDev = JsonUtils.decodeFromString(jsonObject.toString())
        val dataOneDay = dataMsh.convertToDataOneDay()
        val dataOneDayStr = Gson().toJson(dataOneDay)
        return JsonUtils.parseToJsonElement(dataOneDayStr).jsonObject
    }
}