package com.stock.haiIndicator.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class WebController {
    @GetMapping("/searchData")
    fun searchData(): String = "searchData"

    @GetMapping("/detectOneCode")
    fun detectOneCode(): String = "detectOneCode"

    @GetMapping("/detectOneIndicator")
    fun detectOneIndicator(): String = "detectOneIndicator"

    @GetMapping("/nen8")
    fun nen8(): String = "nen8"
}
