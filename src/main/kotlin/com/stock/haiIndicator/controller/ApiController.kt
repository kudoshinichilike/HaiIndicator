package com.stock.haiIndicator.controller

import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.payload.req.DetectOneCodeReq
import com.stock.haiIndicator.payload.req.DetectOneIndicatorReq
import com.stock.haiIndicator.payload.req.ReqSearchData
import com.stock.haiIndicator.payload.res.DetectOneCodeRes
import com.stock.haiIndicator.payload.res.DetectOneIndicatorRes
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

    @PostMapping(value = ["/detectOneIndicator"])
    suspend fun detectOneIndicator(@Valid @RequestBody req: DetectOneIndicatorReq): DetectOneIndicatorRes {
        val codes = mutableListOf<String>()
        if (req.code.contains("ALL_CODE"))
            codes.addAll(searchDataService.getListCodeSearch())
        else
            codes.addAll(req.code)
        val resDetect = detectService.detectOneIndicator(codes, req.indicatorName, req.dateStart, req.dateEnd)
        return when (resDetect) {
            is Left -> DetectOneIndicatorRes(resDetect.value.code)
            is Right -> DetectOneIndicatorRes(ErrorDefine.SUCCESS.code, resDetect.value)
        }
    }

    @PostMapping(value = ["/detectOneCode"])
    suspend fun detectOneCode(@Valid @RequestBody req: DetectOneCodeReq): DetectOneCodeRes {
        println("detectOneCode $req")
        val listIndicatorName = mutableListOf<String>()
        if (req.indicatorName.contains("All"))
            listIndicatorName.addAll(detectService.getListIndicator())
        else
            listIndicatorName.addAll(req.indicatorName)

        val resDetect = detectService.indicateOneCode(req.code, listIndicatorName, req.dateStart, req.dateEnd)
        return when (resDetect) {
            is Left -> {
                println("detectOneCode Left ${resDetect.value.code}")
                DetectOneCodeRes(resDetect.value.code)
            }
            is Right -> {
                println("resDetect ${resDetect.value}")
                DetectOneCodeRes(ErrorDefine.SUCCESS.code, resDetect.value)
            }
        }
    }

    @PostMapping(value = ["/searchData"])
    suspend fun searchData(@Valid @RequestBody req: ReqSearchData): ResSearchData {
        val resSearch = searchDataService.searchDataCafeF(req)
//        println("searchData resSearch: $resSearch")
        return resSearch
    }

    @GetMapping(value = ["/getListCode"])
    suspend fun getListCodeSearch(): List<String> {
        val listCode = searchDataService.getListCodeSearch()
//        println("getListCodeSearch listCode: $listCode")
        return listCode
    }

    @GetMapping(value = ["/getListIndicator"])
    suspend fun getListIndicator(): List<String> {
        val listIndicator = detectService.getListIndicator()
//        println("getListIndicator listIndicator: $listIndicator")
        return listIndicator
    }
}