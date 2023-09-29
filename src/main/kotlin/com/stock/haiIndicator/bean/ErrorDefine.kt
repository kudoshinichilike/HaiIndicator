package com.stock.haiIndicator.bean

enum class ErrorDefine (val code: Byte) {
    SUCCESS(0),
    FAIL(-1),
    NO_EXIST_DATA(1),
    NO_EXIST_DETECTOR(2),
    INVALID_CODE(3),
    INVALID_DATE(4),
    INVALID_SOURCE(5),
    ;
}