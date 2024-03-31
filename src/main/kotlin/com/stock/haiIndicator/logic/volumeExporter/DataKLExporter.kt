package com.stock.haiIndicator.logic.volumeExporter

import com.google.gson.Gson
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.dataDAO.dataVDS.DataVDSDAO
import com.stock.haiIndicator.dataDAO.dataVDS.entities.DataKLBf
import com.stock.haiIndicator.dataDAO.dataVDS.entities.OneDayVDS
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.detectConfig.CodeConfigVDS
import com.stock.haiIndicator.define.systemConfig.ToolConfig
import com.stock.haiIndicator.logic.cacheStore.KLStore
import com.stock.haiIndicator.logic.cacheStore.KLStoreVDS
import com.stock.haiIndicator.logic.processDataBefore.ProcessDataBefore
import com.stock.haiIndicator.logic.processDataBefore.ProcessDataBeforeVDS
import com.stock.haiIndicator.service.DateValidator
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import org.apache.poi.ss.usermodel.Row
import org.apache.poi.ss.usermodel.Sheet
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.slf4j.LoggerFactory
import java.io.FileOutputStream
import java.util.*

/***
 * create by: PhuogNguyen, in 20/1/2024
 * Hôm nay em Việt có nhờ mình lấy khối lượng ATC, vì gs Hải nhờ em ấy lấy, mà sợ tối nay k kịp. Mình muốn làm giúp em.
 * Một phần cũng vì sắp sóng to, mình muốn học.
 * Không biết tương lai như nào. Nhưng cố lên Phương nhé!
 */
object DataKLExporter {
    private val logger = LoggerFactory.getLogger(this.javaClass.simpleName)

    suspend fun exportDataKL(dateEndStr: String) {
        val dateToResult = mutableMapOf<String, MutableMap<String, DataKLBf>>()
        CodeConfigVDS.codeList.forEach {
//        listOf("TPB", "HDB").forEach {
            code ->
            val codeToDataKL = exportCafeF(code, dateEndStr)
                codeToDataKL.forEach { (dateStr, dataKL) ->
                    if (!dateToResult.contains(dateStr))
                        dateToResult[dateStr] = mutableMapOf()
                    dateToResult[dateStr]!![code] = dataKL
                }
            }

        dateToResult.forEach { (dateStr, result) ->
            FileWriter.writeToFile(ToolConfig.pathOutputKL + dateStr, Gson().toJson(result))
        }
    }

    suspend fun exportCafeF(code: String, dateEndStr: String): Map<String, DataKLBf> {
        logger.info("exportCafeF $code $dateEndStr")

        val dateEnd = ConstDefine.SDF.parse(dateEndStr)
        val calendar = Calendar.getInstance()
        calendar.time = dateEnd
        calendar.add(Calendar.DATE, -50)

        val dateToKL = mutableMapOf<String, DataKLBf>()
        val listData = mutableListOf<Pair<String, DataOneDay>>()

        while (calendar.time.before(dateEnd)) {
            calendar.add(Calendar.DATE, 1)
            val currentDate = calendar.time
            val currentDateStr = ConstDefine.SDF.format(currentDate)
            if (!DateValidator.validateDateGet(currentDateStr))
                continue
            val dataCur = DAO.getDataOneDay(code, currentDateStr)
            if (dataCur != null)
                listData.add(Pair(currentDateStr, dataCur))
        }

        for (i in 21..<listData.size) {
            val listDataCalc = listData.subList(i-20, i-1)
            val resDataKL = DataKLBf(
                listDataCalc.sumOf { it.second.TongKhoiLuong },
                listDataCalc.sumOf { it.second.KLATO },
                listDataCalc.sumOf { it.second.KLATC },
            )
            dateToKL[listData[i].first] = resDataKL
        }

        return dateToKL
    }

    suspend fun exportVDS(code: String, dateEndStr: String): Map<String, DataKLBf> {
        logger.info("exportVDS $code $dateEndStr")

        val dateEnd = ConstDefine.SDF.parse(dateEndStr)
        val calendar = Calendar.getInstance()
        calendar.time = dateEnd
        calendar.add(Calendar.DATE, -30)

        val dateToKL = mutableMapOf<String, DataKLBf>()
        val listData = mutableListOf<Pair<String, OneDayVDS>>()

        while (calendar.time.before(dateEnd)) {
            calendar.add(Calendar.DATE, 1)
            val currentDate = calendar.time
            val currentDateStr = ConstDefine.SDF.format(currentDate)
            if (!DateValidator.validateDateGet(currentDateStr))
                continue
            val dataCur = DataVDSDAO.getDataOneDay(code, currentDate)
            if (dataCur != null)
                listData.add(Pair(currentDateStr, dataCur))
        }

        for (i in 21..<listData.size) {
            val listDataCalc = listData.subList(i - 20, i - 1)
            val resDataKL = DataKLBf(
                listDataCalc.sumOf { it.second.tongKhoiLuong },
                listDataCalc.sumOf { it.second.volATO },
                listDataCalc.sumOf { it.second.volATC },
            )
            dateToKL[listData[i].first] = resDataKL
        }

        return dateToKL
    }
}