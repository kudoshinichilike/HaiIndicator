package com.stock.haiIndicator.payload.req

import jakarta.validation.constraints.NotBlank

data class DetectOneIndicatorReq(
    @field:NotBlank(message = "code must not be blank")
    val code: List<String>,

    @field:NotBlank(message = "indicatorName must not be blank, indicator from 1->8v")
    val indicatorName: String,

    @field:NotBlank(message = "dateStart must not be blank")
    val dateStart: String,

    @field:NotBlank(message = "dateEnd must not be blank")
    val dateEnd: String
)