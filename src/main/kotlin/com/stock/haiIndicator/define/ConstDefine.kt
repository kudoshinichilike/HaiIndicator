package com.stock.haiIndicator.define

import java.text.SimpleDateFormat
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*

object ConstDefine {
    val SDF = SimpleDateFormat("yyyy-MM-dd")
    val SDF_LIVE_HAI = SimpleDateFormat("dd/MM/yyyy")
//    val SDF_cafeF = SimpleDateFormat("dd/MM/yyyy")
    val SDF_cafeF = SimpleDateFormat("yyyyMMdd")  //mshDev
    const val MAX_RANGE_DATE_SEARCH = 20
    const val pathSaveDataCafeF = "cafeF/"
    val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")
    val zone = ZoneId.of("Asia/Bangkok")
}