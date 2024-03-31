package com.stock.haiIndicator

import com.google.gson.Gson
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.dataDAO.dataVDS.DataVDSDAO
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.detectConfig.CodeConfig
import com.stock.haiIndicator.define.detectConfig.CodeConfigVDS
import com.stock.haiIndicator.logic.detectIndex.detect.DetectIndex3
import com.stock.haiIndicator.logic.detectIndex.detect.index5.index5BID.DetectIndex5BID
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import kotlinx.coroutines.runBlocking
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
@EnableScheduling
class HaiIndicatorApplication

suspend fun main(args: Array<String>) {
	System.setProperty("log4j.configurationFile", ConstDefine.prePathLoad + "config/log4j2.xml")
	initConfig()
	runApplication<HaiIndicatorApplication>(*args)

	Runtime.getRuntime().addShutdownHook(object : Thread() {
		override fun run() = runBlocking{
//			KLStore.save()
//			KLStoreVDS.save()
//			ResultStore.save()
			println("Shutdown !!!")
//			delay(5000)
		}
	})

//	test()
}

fun initConfig() {
	CodeConfig
}

suspend fun test() {
//	ProcessDataBeforeVDS.getAvgKLBefore("MBB", ConstDefine.SDF.parse("2024-03-12"), 20)
//	DataKLExporter.exportDataKL("2024-03-18")
//	testGetDataFromAKelvin()
	testNen()
}

suspend fun testGetDataFromAKelvin() {
	val listCodeErrData = mutableSetOf<String>()
	val listDateStr = listOf("2024-03-14")
	listDateStr.forEach { curDateStr ->
		val curDate = ConstDefine.SDF.parse(curDateStr)
		CodeConfigVDS.codeList.forEach { code ->
			if (DataVDSDAO.getDataOneDay(code, curDate) == null || DAO.getDataOneDay(code, curDateStr) == null)
				listCodeErrData.add(code)
		}
	}

//	FileWriter.writeToFile( "config/json/errDataCode",
//		Gson().toJson(listCodeErrData))

	println("${Gson().toJson(CodeConfigVDS.codeList)}")
}

suspend fun testNen() {
//	val codeList = listOf("BID" to "2024-03-08")
	val codeList = listOf("DGC" to "2024-03-08")

//	val codeList = listOf("KBC" to "2024-01-22", "KBC" to "2023-12-06", "KBC" to "2023-12-07",
//		"HVN" to "2024-02-27", "HVN" to "2024-02-19", "HVN" to "2024-01-02", "HVN" to "2023-12-11",
//		"PET" to "2024-02-05", "PET" to "2023-12-07", "PET" to "2023-11-24",
//		"EVF" to "2024-01-02", "EVF" to "2023-12-07", "EVF" to "2024-02-27", "EVF" to "2024-02-28", "EVF" to "2024-02-29", "EVF" to "2024-03-01",
//		"VGC" to "2024-03-01", "VGC" to "2024-01-02", "VGC" to "2024-01-23", "VGC" to "2023-12-07", "VGC" to "2023-02-23",
//		"KDH" to "2023-12-14", "KDH" to "2023-12-07",
//		"GEX" to "2023-12-07",
//		"VCG" to "2023-12-07",
//		"PDR" to "2023-12-07",
//		"BAF" to "2024-01-03", "BAF" to "2024-01-29", "BAF" to "2024-01-10", "BAF" to "2024-01-05", "BAF" to "2023-11-28",
//		"BFC" to "2023-10-26", "BFC" to "2023-10-31", "BFC" to "2023-12-06"
//	)
	codeList.forEach { (code, dateStr) ->
		println("phuongnm5: $code  $dateStr")
		when (val tRes = DetectIndex3.detect(code, ConstDefine.SDF.parse(dateStr))) {
			is Left -> println("left: ${tRes.value}")
			is Right -> println("right: ${Gson().toJson(tRes.value)}")
		}
	}
}