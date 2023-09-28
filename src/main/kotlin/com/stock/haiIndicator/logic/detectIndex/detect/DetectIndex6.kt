package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.bean.ErrorDefine
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import java.util.*

object DetectIndex6: IDetectIndex {
    fun detect(data: DataOneDay): Boolean {
        if (!isValidShape(data))
            return false

        val aKL = percentAKL(data)
        return aKL >= 0.8
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return data.GiaCaoNhat == data.GiaMoCua
    }

    private fun percentAKL(data: DataOneDay): Float {
        return data.percentKLLowerPriceUnbound(data.GiaDongCua)
    }

    private fun percentBKL(data: DataOneDay): Float {
        return data.percentKLUpperPrice(data.GiaDongCua)
    }

    override fun detect(code: String, date: Date): Either<ErrorDefine, Boolean> {
        TODO("Not yet implemented")
    }
}