package com.stock.haiIndicator.define.systemConfig

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.serverConfig.ServerConfig
import java.io.FileInputStream
import java.util.*

object ToolConfig {
    val pathOutputDetectDaily: String
    val pathOutputKL: String
    val pathOutputKL_VDS: String

    init {
        val props = Properties()

        val pathFile = ServerConfig.prePathLoad + "config/tool.properties"
        val inputStream = FileInputStream(pathFile)

        props.load(inputStream)

        pathOutputDetectDaily = props.getProperty("pathOutputScheduleDaily")
        pathOutputKL = props.getProperty("pathOutputKL")
        pathOutputKL_VDS = props.getProperty("pathOutputKLVDS")
    }
}