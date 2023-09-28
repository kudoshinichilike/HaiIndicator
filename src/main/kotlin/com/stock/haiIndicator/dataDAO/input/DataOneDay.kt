package com.stock.haiIndicator.dataDAO.input

import kotlinx.serialization.Serializable

@Serializable
data class DataOneDay(
    val dataError: Boolean = false,
    val GiaCaoNhat: Float,
    val GiaDongCua: Float,
    var GiaMoCua: Float,
    val GiaThamChieu: Float,
    val GiaThapNhat: Float,
    val GiaThayDoi: String,
    val TongKhoiLuong: Int,
    val DlChiTiet: List<DataOneMatch>,
    val DlTongHop: List<DataOneStatistic>,
) {
    init {
        GiaMoCua = DlChiTiet[0].Gia
    }
    /***
     * inclusive maxPrice
     */
    fun calcKL(minPrice: Float, maxPrice: Float): Int {
        return DlChiTiet.filter { it.Gia in minPrice..maxPrice }.sumOf { it.KLLo.toInt() }
    }

    fun calcKLUpperPrice(minPrice: Float): Int {
        return DlChiTiet.filter { minPrice <= it.Gia }.sumOf { it.KLLo.toInt() }
    }

    fun calcKLLowerPrice(maxPrice: Float): Int {
        return DlChiTiet.filter { it.Gia <= maxPrice }.sumOf { it.KLLo.toInt() }
    }

    fun calcKLLowerPriceUnbound(maxPrice: Float): Int {
        return DlChiTiet.filter { it.Gia < maxPrice }.sumOf { it.KLLo.toInt() }
    }

    fun calcKLUpperPriceUnbound(minPrice: Float): Int {
        return DlChiTiet.filter { minPrice < it.Gia }.sumOf { it.KLLo.toInt() }
    }

//    fun calcKLowerPriceUnbound(maxPrice: Float): Int {
//        return DlChiTiet.filter { it.Gia < maxPrice }.sumOf { it.KLLo.toInt() }
//    }

    /***
     * inclusive maxPrice
     */
    fun percentKL(minPrice: Float, maxPrice: Float): Float {
        return calcKL(minPrice, maxPrice) / TongKhoiLuong.toFloat()
    }

    fun percentKLUpperPrice(minPrice: Float): Float{
        return calcKLUpperPrice(minPrice) / TongKhoiLuong.toFloat()
    }

    fun percentKLowerPrice(maxPrice: Float): Float {
        return calcKLLowerPrice(maxPrice) / TongKhoiLuong.toFloat()
    }

    fun percentKLLowerPriceUnbound(maxPrice: Float): Float {
        return calcKLLowerPriceUnbound(maxPrice) / TongKhoiLuong.toFloat()
    }

    fun percentKLLowerPrice(maxPrice: Float): Float {
        return calcKLLowerPrice(maxPrice) / TongKhoiLuong.toFloat()
    }

    fun percentKLUpperPriceUnbound(minPrice: Float): Float {
        return calcKLUpperPriceUnbound(minPrice) / TongKhoiLuong.toFloat()
    }

    fun calcKLATO() : Int {
        return getMatchATO().KLLo.toInt()
    }

    fun calcPercentATO() : Float {
        return calcKLATO() / TongKhoiLuong.toFloat()
    }

    fun getMatchATO(): DataOneMatch {
        return DlChiTiet[0]
    }

    fun getMatchATC(): DataOneMatch {
        return DlChiTiet[DlChiTiet.size-1]
    }
}