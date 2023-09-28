package com.stock.haiIndicator.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class WebController {
    @GetMapping("/searchData")
    fun searchData(): String = "searchData"
}
