package com.stock.haiIndicator.payload.req

import jakarta.validation.constraints.NotBlank

data class ReqSearchData(
    @field:NotBlank(message = "code must not be blank")
    val code: String,

    @field:NotBlank(message = "dateSearch must not be blank")
    val dateSearch: String,
) {
    init {
        println("dateSearch in req: $dateSearch")
    }
}