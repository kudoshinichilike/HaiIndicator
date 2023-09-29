package com.stock.haiIndicator

import com.stock.haiIndicator.bean.config.CodeConfig
import com.stock.haiIndicator.dataDAO.queryData.QueryData
import kotlinx.coroutines.runBlocking
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
class HaiIndicatorApplication

fun main(args: Array<String>) {
	initConfig()
	runApplication<HaiIndicatorApplication>(*args)
}

fun initConfig() {
	CodeConfig
}