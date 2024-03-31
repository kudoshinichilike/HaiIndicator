package com.stock.haiIndicator.define

import java.text.SimpleDateFormat
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*

object ConstDefine {
    val SDF_PATTERN = "yyyy-MM-dd"
    val SDF = SimpleDateFormat(SDF_PATTERN)
    val SDF_LIVE_HAI = SimpleDateFormat("dd/MM/yyyy")
//    val SDF_cafeF = SimpleDateFormat("dd/MM/yyyy")
    val SDF_cafeF = SimpleDateFormat("yyyyMMdd")  //mshDev
    val SDF_VDS = SimpleDateFormat("dd/MM/yyyy")  //anh Kelvin
    const val MAX_RANGE_DATE_SEARCH = 20
    const val pathSaveDataCafeF = "cafeF/"
    val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")
    val zone = ZoneId.of("Asia/Bangkok")
    val DATE_START_VDS = SDF.parse("2023-12-11")

    val prePathLoad = "/home/phuongnm5/toolAnhHai/data/"
//    val prePathLoad = System.getProperty("user.dir") + "/data/"
    val dateValidScan: Date = SDF.parse("2024-03-01")
}