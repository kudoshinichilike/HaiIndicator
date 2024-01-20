package com.stock.haiIndicator.logic.volumnAnalyze

import com.stock.haiIndicator.define.detectConfig.CodeConfig
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.logger.GlobalLogger

object CalcVolInDuration {
    suspend fun calc(code: String, dateStr: String, timeStart: String, timeEnd: String): Float {
        val data = DAO.getDataOneDay(code, dateStr)
        if (data != null)
            return data.calcPercentVolInDuration(timeStart, timeEnd)
        else
            return -1f
    }

    suspend fun calcAllCode(dateStr: String, timeStart: String, timeEnd: String) {
        val percentVolume = calc("VCB", dateStr, timeStart, timeEnd)
        if (percentVolume != -1f)
                GlobalLogger.detectLogger.debug("VCB $percentVolume")

        CodeConfig.codeList.forEach { code ->
            val percentVolume = calc(code, dateStr, timeStart, timeEnd)
            if (percentVolume != -1f)
                GlobalLogger.detectLogger.debug("calcAllCode percentVolume != -1f $code $percentVolume")
        }
    }
}