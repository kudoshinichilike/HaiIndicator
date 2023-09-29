package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.bean.ErrorDefine
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex8T: IDetectIndex {
    fun detect(data: DataOneDay, dataBefore: List<DataOneDay>): Boolean {
        val aKL = calcAKL(data)
        val avgBefore = calcAvgBefore(dataBefore)
        return aKL >= 2*avgBefore
    }

    private fun calcAvgBefore(dataBefore: List<DataOneDay>): Double  {
        return dataBefore.sumOf { it.calcKLATO() } / dataBefore.size.toDouble()
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return data.GiaCaoNhat == data.GiaMoCua
    }

    private fun calcAKL(data: DataOneDay): Int {
        return data.calcKLATO()
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Boolean> {
        return Right(false)
    }
}