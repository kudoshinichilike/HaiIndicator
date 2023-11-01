package com.stock.haiIndicator.service

import com.stock.haiIndicator.bean.ConstDefine
import java.util.*

object DateValidator {
    fun validateDate(dateStr: String): Boolean {
        val calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"))
        calendar.time = ConstDefine.SDF.parse(dateStr)
        val dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK)
        return !(dayOfWeek == Calendar.SUNDAY || dayOfWeek == Calendar.SATURDAY)
    }
}