package com.stock.haiIndicator.controller

import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.payload.req.IndicateOneCodeReq
import com.stock.haiIndicator.payload.req.ReqSearchData
import com.stock.haiIndicator.payload.res.IndicateOneCodeRes
import com.stock.haiIndicator.payload.res.ResSearchData
import com.stock.haiIndicator.service.DetectService
import com.stock.haiIndicator.service.SearchDataService
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/haiIndicator")
class ApiController {
    val detectService: DetectService = DetectService()
    val searchDataService: SearchDataService = SearchDataService()

    @GetMapping(value = [""])
    fun detect(): String {
        return "phuonggg"
    }

//    @PostMapping(value = ["/detectOneIndicator"])
//    fun detectOneIndicator(@Valid @RequestBody req: IndicateOneCodeReq): IndicateOneCodeRes {
//        val resDetect = detectService.indicateOneCode(req.code, req.indicatorName, req.dateStart, req.dateEnd)
//        return when (resDetect) {
//            is Left -> IndicateOneCodeRes(resDetect.value.code)
//            is Right -> IndicateOneCodeRes(ErrorDefine.SUCCESS.code, resDetect.value)
//        }
//    }

    @PostMapping(value = ["/detectOneCode"])
    suspend fun detectOneCode(@Valid @RequestBody req: IndicateOneCodeReq): IndicateOneCodeRes {
        println("detectOneCode $req")
        val resDetect = detectService.indicateOneCode(req.code, req.indicatorName, req.dateStart, req.dateEnd)
        return when (resDetect) {
            is Left -> {
                println("detectOneCode Left ${resDetect.value.code}")
                IndicateOneCodeRes(resDetect.value.code)
            }
            is Right -> {
                println("resDetect ${resDetect.value}")
                IndicateOneCodeRes(ErrorDefine.SUCCESS.code, resDetect.value)
            }
        }
    }

    @PostMapping(value = ["/searchData"])
    suspend fun searchData(@Valid @RequestBody req: ReqSearchData): ResSearchData {
        val resSearch = searchDataService.searchDataCafeF(req)
        println("searchData resSearch: $resSearch")
        return resSearch
    }
}