package com.stock.haiIndicator

import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration

import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
//@EnableWebMvc
//@ComponentScan
class ServerConfiguration : WebMvcConfigurer {

    @Override
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        val path = "/resources/static/"
        registry.addResourceHandler("/content/**")
            .addResourceLocations(path)
    }
}