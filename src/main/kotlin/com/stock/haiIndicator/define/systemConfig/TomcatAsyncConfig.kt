package com.stock.haiIndicator.define.systemConfig

import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class TomcatAsyncConfig {
    @Bean
    fun asyncTimeoutCustomize(): TomcatConnectorCustomizer =
        TomcatConnectorCustomizer { connector -> connector.asyncTimeout = 1800000 }
}