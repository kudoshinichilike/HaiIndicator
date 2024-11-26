package com.stock.haiIndicator.define.serverConfig

import java.io.FileInputStream
import java.util.Properties

object ServerConfig {
    var prePathLoad: String

    // some other props can init here
    init {
        val pathFile = System.getProperty("user.dir") + "/config/server.properties"
        val inputStream = FileInputStream(pathFile)

        val props = Properties()
        props.load(inputStream)
        prePathLoad = props.getProperty("prePathLoad")
    }
}