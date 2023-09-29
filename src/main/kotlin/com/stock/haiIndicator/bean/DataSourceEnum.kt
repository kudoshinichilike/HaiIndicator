package com.stock.haiIndicator.bean

enum class DataSourceEnum {
    CAFE_F,
    RONG_VIET,
    FIREANT,
    ;
    companion object {
        private val mapNameToEnum: Map<String, DataSourceEnum>

        init {
            mapNameToEnum = values().associateBy { it.name }
        }

        fun contains(dataSource: String): Boolean {
            return mapNameToEnum.containsKey(dataSource)
        }
    }
}