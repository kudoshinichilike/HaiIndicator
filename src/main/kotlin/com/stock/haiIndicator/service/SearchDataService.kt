package com.stock.haiIndicator.service

import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.payload.req.ReqSearchData
import com.stock.haiIndicator.payload.res.ResSearchData
import org.springframework.stereotype.Service

@Service
class SearchDataService {
    suspend fun searchDataCafeF(reqData: ReqSearchData): ResSearchData {
        val (code, dateStr) = reqData
        if (!validateCode(code))
            return ResSearchData(ErrorDefine.INVALID_CODE.code)

        if (!validateDate(dateStr))
            return ResSearchData(ErrorDefine.INVALID_DATE.code)

        val matchData = DAO.getMatchData(code, dateStr)
        return ResSearchData(ErrorDefine.NO_EXIST_DATA.code, matchData)
//        return ResSearchData(ErrorDefine.INVALID_DATE.code)
    }

    fun validateCode(code: String): Boolean {
        //TODO
        return true
    }

    fun validateDate(dateStr: String): Boolean {
        //TODO
        return true
    }
}
