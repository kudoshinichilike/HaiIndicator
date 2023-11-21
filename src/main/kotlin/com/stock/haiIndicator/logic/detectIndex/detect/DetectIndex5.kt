package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.bean.ConstDefine
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex5: IDetectIndex {
    fun detect(data: DataOneDay): Boolean {
        if (!isValidShape(data))
            return false

        val aKL = percentAKL(data)
        val cKL = percentCKL(data)
        val bKL = 1 - aKL - cKL
//        println("--------------- DetectIndex5 aKL: $aKL")
//        println("--------------- DetectIndex5 bKL: $bKL")
//        println("--------------- DetectIndex5 cKL: $cKL")
        return aKL <= 0.2 && cKL >= 0.1 && (bKL in 0.60..0.85)
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return data.GiaCaoNhat > data.GiaMoCua && data.GiaMoCua > data.GiaDongCua && data.GiaDongCua > data.GiaThapNhat
    }

    private fun percentAKL(data: DataOneDay): Float {
        return data.percentKLUpperPriceUnbound(data.GiaMoCua)
    }

    private fun percentCKL(data: DataOneDay): Float {
        return data.percentKLLowerPriceUnbound(data.GiaDongCua)
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Boolean> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(detect(data))
    }
}