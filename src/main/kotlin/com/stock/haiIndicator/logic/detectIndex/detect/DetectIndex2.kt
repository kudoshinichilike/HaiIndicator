package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.bean.ConstDefine
import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex2: IDetectIndex {
    fun detect(code: String, data: DataOneDay): Boolean {
        if (!isValidShape(data))
            return false

        val aKL = percentAKL(data)
//        println("$code  $aKL")
        return aKL <= 0.8
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return data.GiaCaoNhat > data.GiaMoCua && data.GiaMoCua >= data.GiaDongCua && data.GiaThapNhat == data.GiaDongCua
    }

    private fun percentAKL(data: DataOneDay): Float {
        return data.percentKLUpperPriceUnbound(data.GiaMoCua)
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Boolean> {
        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(detect(code, data))
    }
}