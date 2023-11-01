package com.stock.haiIndicator.dataDAO.input

import com.stock.haiIndicator.payload.res.ResMatchData
import com.stock.haiIndicator.payload.res.ResStatisticData
import kotlinx.serialization.Serializable
import kotlinx.serialization.Transient
import kotlin.math.max
import kotlin.math.round

@Serializable
data class DataOneDay(
    val GiaThamChieu: Float,
    val DlChiTiet: List<DataOneMatch>,
    val DlTongHop: List<DataOneStatistic>,
    var GiaDongCua: Float = DlChiTiet[DlChiTiet.size-1].Gia,
    var GiaMoCua: Float = DlChiTiet[0].Gia,
    var GiaCaoNhat: Float = DlChiTiet.maxOf { it.Gia },
    var GiaThapNhat: Float = DlChiTiet.minOf { it.Gia },
    var TongKhoiLuong: Int = DlChiTiet.sumOf { it.KLLo.toInt() },
) {
    @Transient
    val sortedDLTongHop = DlTongHop.sortedBy { it.Gia }

    @Transient
    var changePrice: Float = 0f

    init {
        if (DlChiTiet.isNotEmpty()) {
            GiaDongCua = DlChiTiet[DlChiTiet.size-1].Gia
            GiaMoCua = DlChiTiet[0].Gia
            GiaCaoNhat = DlChiTiet.maxOf { it.Gia }
            GiaThapNhat = DlChiTiet.minOf { it.Gia }
            TongKhoiLuong = DlChiTiet.sumOf { it.KLLo.toInt() }
        }

        changePrice = (GiaDongCua - GiaMoCua) / GiaMoCua * 100
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

    fun KLStepUp(percentStep: Float): Int {
        if (percentStep < 0 || percentStep > 10)
            throw Exception("KLStepUp invalid percentStep: $percentStep")
        val stepIdx = round(sortedDLTongHop.size * percentStep).toInt()
        val milestonePrice = sortedDLTongHop[sortedDLTongHop.size-stepIdx].Gia
        println("KLStepUp size: ${sortedDLTongHop.size}, stepIdx: ${sortedDLTongHop.size-stepIdx}, milestonePrice: $milestonePrice")
        return calcKLUpperPrice(milestonePrice)
    }

    fun KLStepDown(percentStep: Float): Int {
        if (percentStep < 0 || percentStep > 10)
            throw Exception("KLStepDown invalid percentStep: $percentStep")
        val stepIdx = round(sortedDLTongHop.size * percentStep).toInt()
        val milestonePrice = sortedDLTongHop[stepIdx].Gia
        println("KLStepDown size: ${sortedDLTongHop.size}, stepIdx: $stepIdx, milestonePrice: $milestonePrice")
        return calcKLLowerPriceUnbound(milestonePrice)
    }

    fun percentKLStepUp(percentStep: Float): Float {
        return KLStepUp(percentStep) / TongKhoiLuong.toFloat()
    }

    fun percentKLStepDown(percentDown: Float): Float {
        return KLStepDown(percentDown) / TongKhoiLuong.toFloat()
    }

    fun calcKLATO() : Int {
        return getMatchATO().KLLo.toInt()
    }

    fun calcKLATC() : Int {
        return getMatchATC().KLLo.toInt()
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

    companion object {
        fun convertToSearchDataResponse(data: DataOneDay): Pair<List<ResMatchData>, List<ResStatisticData>> {
            val listMatch = data.DlChiTiet.map {
                ResMatchData(it.ThoiGian, it.Gia, "", it.KLLo, it.KLTichLuy, "")
            }.toList()

            val listStatistic = data.DlTongHop.map {
                ResStatisticData(it.Gia, it.KhoiLuong, it.TyTrong)
            }.toList()

            return Pair(listMatch, listStatistic)
        }
    }
}