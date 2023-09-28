package com.stock.haiIndicator

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
class HaiIndicatorApplication

fun main(args: Array<String>) {
	runApplication<HaiIndicatorApplication>(*args)
}
