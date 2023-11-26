package com.stock.haiIndicator

import com.stock.haiIndicator.bean.config.CodeConfig
import com.stock.haiIndicator.logic.volumnAnalyze.CalcVolInDuration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
class HaiIndicatorApplication

suspend fun main(args: Array<String>) {
	initConfig()
	runApplication<HaiIndicatorApplication>(*args)
//	DAO.getDataOneDay("VGI", "2023-09-29")
//	CalcVolInDuration.calcAllCode("2023-11-23", "", "")
}

fun initConfig() {
	CodeConfig
}