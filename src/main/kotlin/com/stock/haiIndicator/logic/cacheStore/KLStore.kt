package com.stock.haiIndicator.logic.cacheStore

import com.google.gson.Gson
import com.stock.haiIndicator.dataDAO.dataVDS.entities.DataKLBf
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.systemConfig.ToolConfig
import utils.JsonUtils
import java.util.*
import java.util.concurrent.ConcurrentHashMap

object KLStore {
    private const val MAX_DATE_STORE = 100
    private const val NUM_DATE_EACH_REMOVE = 20

    private val dateToKL = mutableMapOf<String, MutableMap<String, DataKLBf>>()
    private val lastTimeAccessKL = ConcurrentHashMap<String, Long>()
    private val haveChange = ConcurrentHashMap<String, Boolean>()

    /***
     * neu get len nul thi sau khi tinh xong, se luu lai
     */
    fun getDataKL(date: Date, code: String): DataKLBf? {
        val dateStr = ConstDefine.SDF.format(date)
        if (!dateToKL.contains(dateStr))
            getFromStore(dateStr)

        val resultThisDate = dateToKL[dateStr]
        return if (resultThisDate != null) {
            lastTimeAccessKL[dateStr] = System.currentTimeMillis()
            resultThisDate[code]
        }
        else
            null
    }

    fun addDataKL(date: Date, code: String, dataKLBf: DataKLBf) {
//        synchronized(dataKLBf) {
//            val dateStr = ConstDefine.SDF.format(date)
//            if (!dateToKL.contains(dateStr))
//                getFromStore(dateStr)
//            if (!dateToKL.contains(dateStr))
//                dateToKL[dateStr] = mutableMapOf()
//
//            val resultThisDate = dateToKL[dateStr]!!
//            if (!resultThisDate.contains(code)) {
//                resultThisDate[code] = dataKLBf
//                haveChange[dateStr] = true
//                lastTimeAccessKL[dateStr] = System.currentTimeMillis()
//            }
//        }
    }

    private fun getFromStore(dateStr: String) {
        synchronized(dateToKL) {
            scanRemove()

            val filePath = ToolConfig.pathOutputKL + dateStr
            if (JsonUtils.checkExistFile(filePath)) {
                val majorData: MutableMap<String, DataKLBf>
                        = JsonUtils.decodeFromFile(filePath)
                dateToKL[dateStr] = majorData
                lastTimeAccessKL[dateStr] = System.currentTimeMillis()
            }
        }
    }

    private fun scanRemove() {
        if (dateToKL.size >= MAX_DATE_STORE) {
            val keyRemove = lastTimeAccessKL.entries.sortedBy { it.value }.take(NUM_DATE_EACH_REMOVE)
            keyRemove.forEach {
                save(it.key)
                dateToKL.remove(it.key)
                lastTimeAccessKL.remove(it.key)
                haveChange.remove(it.key)
            }
        }
    }

    private fun save(dateStr: String) {
//        if (haveChange.getOrDefault(dateStr, false)) {
//            FileWriter.writeToFile(ToolConfig.pathOutputKL + dateStr, Gson().toJson(dateToKL[dateStr]))
//        }
    }

    fun save() {
//        synchronized(dateToKL) {
//            dateToKL.forEach{
//                save(it.key)
//            }
//        }
    }
}