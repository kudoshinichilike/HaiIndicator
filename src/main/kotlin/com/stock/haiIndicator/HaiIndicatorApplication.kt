package com.stock.haiIndicator

import com.stock.haiIndicator.define.detectConfig.CodeConfig
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
@EnableScheduling
class HaiIndicatorApplication

suspend fun main(args: Array<String>) {
	System.setProperty("log4j.configurationFile", "config/log4j2.xml")
	initConfig()
	runApplication<HaiIndicatorApplication>(*args)
//	DAO.getDataOneDay("VGI", "2023-09-29")
//	CalcVolInDuration.calcAllCode("2023-11-23", "", "")
}

fun initConfig() {
	CodeConfig
}