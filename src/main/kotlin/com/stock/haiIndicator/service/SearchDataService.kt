package com.stock.haiIndicator.service

import com.stock.haiIndicator.define.DataSourceEnum
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.define.detectConfig.CodeConfig
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.payload.req.ReqSearchData
import com.stock.haiIndicator.payload.res.ResSearchData
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*

@Service
class SearchDataService {
    val logger: Logger = LoggerFactory.getLogger("SearchDataService")
    fun getListCodeSearch(): List<String> {
        return CodeConfig.codeList.toList()
    }

    suspend fun searchDataCafeF(reqData: ReqSearchData): ResSearchData {
        logger.debug("searchDataCafeF $reqData")
        val (code, dateStr, dataSource) = reqData
        if (!validateCode(code))
            return ResSearchData(ErrorDefine.INVALID_CODE.code)

        if (!DateValidator.validateDateDetect(dateStr)) {
            return ResSearchData(ErrorDefine.INVALID_DATE.code)
        }

        if (!validateDataSource(dataSource))
            return ResSearchData(ErrorDefine.INVALID_SOURCE.code)

        val dataOneDay = DAO.getDataOneDay(code, dateStr) ?: return ResSearchData(ErrorDefine.NO_EXIST_DATA.code)
        val (matchData, statisticData) = DataOneDay.convertToSearchDataResponse(dataOneDay)
        return ResSearchData(ErrorDefine.SUCCESS.code, matchData, statisticData)
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
