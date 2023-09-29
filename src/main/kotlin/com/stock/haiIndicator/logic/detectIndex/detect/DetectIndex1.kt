package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.bean.ConstDefine
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*
import kotlin.math.max
import kotlin.math.min

object DetectIndex1: IDetectIndex {
    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Boolean> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(detect(data))
    }

    fun detect(data: DataOneDay): Boolean {
        if (!isValidShape(data))
            return false

        val aKL = percentAKL(data)
        println("--------------- DetectIndex1 $aKL")
        return aKL >= 0.8
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return isValidShape1(data)
//        return isValidShape2(data)
    }

    private fun isValidShape1(data: DataOneDay): Boolean {
        return data.GiaCaoNhat == data.GiaMoCua && data.GiaDongCua <= data.GiaCaoNhat
    }

    private fun isValidShape2(data: DataOneDay): Boolean {
        val dk1 = min(data.GiaDongCua, data.GiaMoCua) > data.GiaThapNhat
        val dk2 = max(data.GiaDongCua, data.GiaMoCua) == data.GiaCaoNhat
        return dk1 && dk2
    }

    private fun percentAKL(data: DataOneDay): Float {
//        return data.percentKLLowerPrice(min(data.GiaDongCua, data.GiaMoCua))
        return data.percentKLLowerPrice(data.GiaDongCua)
    }
}