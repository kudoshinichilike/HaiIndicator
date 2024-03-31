package com.stock.haiIndicator.logic.cacheStore

import com.google.gson.Gson
import com.stock.haiIndicator.dataDAO.dataVDS.entities.DataKLBf
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.systemConfig.ToolConfig
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import utils.JsonUtils
import java.util.*
import java.util.concurrent.ConcurrentHashMap

object ResultStore {
    private const val MAX_DATE_STORE = 100
    private const val NUM_DATE_EACH_REMOVE = 20

    private val dateToResult = mutableMapOf<String, MutableMap<DefineDetector, MutableList<String>>>()
    private val lastTimeAccessResult = ConcurrentHashMap<String, Long>()
    private val haveChange = ConcurrentHashMap<String, Boolean>()

    fun getResult(date: Date, detector: DefineDetector, code: String): Boolean? {
        val dateStr = ConstDefine.SDF.format(date)
        if (!dateToResult.contains(dateStr))
            getFromStore(dateStr)

        val resultThisDate = dateToResult[dateStr]
        return if (resultThisDate!= null) {
            lastTimeAccessResult[dateStr] = System.currentTimeMillis()
            getResult(resultThisDate, detector, code)
        }
        else
            null //TODO: sua thanh null moi dung, de tam de demo
    }

    private fun getResult(mapRes: Map<DefineDetector, List<String>>, detector: DefineDetector, code: String): Boolean {
         return mapRes[detector]?.contains(code) ?: false
    }

    fun addResult(date: Date, code: String, detector: DefineDetector) {
        //TODO: nếu muốn add thì phải tính, code -> true/ false. Không thể lưu list code.
//        synchronized(dateToResult) {
//            val dateStr = ConstDefine.SDF.format(date)
//            if (!dateToResult.contains(dateStr))
//                getFromStore(dateStr)
//            if (!dateToResult.contains(dateStr))
//                dateToResult[dateStr] = mutableMapOf()
//
//            val resultThisDate = dateToResult[dateStr]!!
//            if (!resultThisDate.contains(detector))
//                resultThisDate[detector] = mutableListOf()
//
//            val resultDetector = resultThisDate[detector]!!
//            if (!resultDetector.contains(code)) {
//                resultDetector.add(code)
//                haveChange[dateStr] = true
//                lastTimeAccessResult[dateStr] = System.currentTimeMillis()
//            }
//        }
    }

    private fun getFromStore(dateStr: String) {
        synchronized(dateToResult) {
            scanRemove()

            val filePath = ToolConfig.pathOutputDetectDaily + dateStr
            if (JsonUtils.checkExistFile(filePath)) {
                val majorData: Map<String, MutableList<String>>
                        = JsonUtils.decodeFromFile(filePath)
                dateToResult[dateStr] = majorData.filter { DefineDetector.getEnumFromName(it.key) != null }
                                                .mapKeys { DefineDetector.getEnumFromName(it.key)!! }
                                                .toMutableMap()
            }
        }
    }

    private fun scanRemove() {
        if (dateToResult.size >= MAX_DATE_STORE) {
            val keyRemove = lastTimeAccessResult.entries.sortedByDescending { it.value }.take(NUM_DATE_EACH_REMOVE)
            keyRemove.forEach {
                dateToResult.remove(it.key)
                lastTimeAccessResult.remove(it.key)
                haveChange.remove(it.key)
            }
        }
    }

    private fun save(dateStr: String) {
//        if (haveChange.getOrDefault(dateStr, false)) {
//            FileWriter.writeToFile(ToolConfig.pathOutputDetectDaily + dateStr, Gson().toJson(dateToResult[dateStr]))
//        }
    }

    fun save() {
//        synchronized(dateToResult) {
//            dateToResult.forEach{
//                save(it.key)
//            }
//        }
    }
}