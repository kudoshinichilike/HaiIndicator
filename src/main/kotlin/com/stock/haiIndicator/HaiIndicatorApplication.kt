package com.stock.haiIndicator

import com.stock.haiIndicator.bean.config.CodeConfig
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
class HaiIndicatorApplication

suspend fun main(args: Array<String>) {
	initConfig()
	runApplication<HaiIndicatorApplication>(*args)
//	DAO.getDataOneDay("VGI", "2023-09-29")
}

fun initConfig() {
	CodeConfig
}