package com.stock.haiIndicator.logger

import org.slf4j.Logger
import org.slf4j.LoggerFactory

object GLLogger {
    val logger: Logger = LoggerFactory.getLogger("GlobalLogger")
    val detectLogger: Logger = LoggerFactory.getLogger("DetectLogger")
    val oneDayLogger: Logger = LoggerFactory.getLogger("OneDayLogger")
}