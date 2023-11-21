package com.stock.haiIndicator.payload.req

import jakarta.validation.constraints.NotBlank

data class Nen8Req(
    @field:NotBlank(message = "code must not be blank")
    val code: List<String>,

    @field:NotBlank(message = "multiply must not be blank, indicator from 1->8v")
    val multiply: Int,

    @field:NotBlank(message = "numDateBf must not be blank, indicator from 1->8v")
    val numDateBf: Int,

    @field:NotBlank(message = "dateStart must not be blank")
    val dateStart: String,

    @field:NotBlank(message = "dateEnd must not be blank")
    val dateEnd: String
)