package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.bean.ConstDefine
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

/**
 * VCG 12/2018
 *
 * Cứ tính 7 bước giá trước, tuning sau
 */
object DetectIndex3: IDetectIndex {
    private val aBuocGia = 7
    private val percentVolumnValid = 0.8
    fun detect(data: DataOneDay): Boolean {
        if (!isValidShape(data))
            return false

        val aKL = percentAKL(data)
        return aKL >= percentVolumnValid
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return isValidShape1(data)
//        return isValidShape2(data)
    }

    private fun isValidShape1(data: DataOneDay): Boolean {
        return data.GiaCaoNhat == data.GiaMoCua && data.GiaThapNhat == data.GiaDongCua
    }

    private fun isValidShape2(data: DataOneDay): Boolean {
        return data.GiaMoCua > data.GiaDongCua && (data.GiaMoCua - data.GiaDongCua) / data.GiaMoCua > 0.04
    }

    private fun percentAKL(data: DataOneDay): Float {
        return data.percentKLLowerPriceUnbound(data.GiaDongCua)
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Boolean> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(detect(data))
    }
}