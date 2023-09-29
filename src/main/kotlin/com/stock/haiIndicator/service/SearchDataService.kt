package com.stock.haiIndicator.service

import com.stock.haiIndicator.bean.DataSourceEnum
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.bean.config.CodeConfig
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.payload.req.ReqSearchData
import com.stock.haiIndicator.payload.res.ResSearchData
import org.springframework.stereotype.Service
import utils.TimeUtils
import java.util.*

@Service
class SearchDataService {
    suspend fun searchDataCafeF(reqData: ReqSearchData): ResSearchData {
        println("searchDataCafeF $reqData")
        val (code, dateStr, dataSource) = reqData
        if (!validateCode(code))
            return ResSearchData(ErrorDefine.INVALID_CODE.code)

        if (!validateDate(dateStr)) {
            return ResSearchData(ErrorDefine.INVALID_DATE.code)
        }

        if (!validateDataSource(dataSource))
            return ResSearchData(ErrorDefine.INVALID_SOURCE.code)

        val matchData = DAO.getMatchData(code, dateStr)
        return ResSearchData(ErrorDefine.SUCCESS.code, matchData)
    }

    fun validateCode(code: String): Boolean {
        return CodeConfig.containsCode(code)
    }

    fun validateDate(dateStr: String): Boolean {
        val calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"))
        val dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK)
        if (dayOfWeek == Calendar.SUNDAY || dayOfWeek == Calendar.SATURDAY)
            return false
        return true
    }

    fun validateDataSource(dataSource: String): Boolean {
        return DataSourceEnum.contains(dataSource)
    }
}
