package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.dataDAO.DAO
import com.zps.bitzerokt.utils.some_monad.Either
import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.logger.GLLogger
import com.stock.haiIndicator.logic.cacheStore.ResultStore
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

/**
 * VCG 12/2018
 *
 * Cứ tính 7 bước giá trước, tuning sau
 */
object DetectIndex3: IDetectIndex {
    private val aBuocGia = 0.7f
    private val percentVolumnValid = 0.7
    fun detect(code: String, date: Date, data: DataOneDay): Pair<Boolean, SealedResDetect> {
        if (!isValidShape(data))
            return Pair(false, SealedResDetect())

        val aKL = percentAKL(data)
        GLLogger.detectLogger.info("--------------- DetectIndex3 $aKL")
        return if (aKL >= percentVolumnValid) {
            ResultStore.addResult(date, code, DefineDetector.getEnumFromDetector(this)!!)
            Pair(aKL >= percentVolumnValid, SealedResDetect())
        }
        else
            Pair(false, SealedResDetect())
    }

    private fun isValidShape(data: DataOneDay): Boolean {
        return isValidShape1(data)
    }

    private fun isValidShape1(data: DataOneDay): Boolean {
        GLLogger.detectLogger.info("changePrice ${data.changePrice}")
        val con1 = data.GiaMoCua > data.GiaDongCua
        val con2 = (data.GiaMoCua / data.GiaDongCua - 1) >= 0.02
        val con3 = (data.GiaCaoNhat / data.GiaMoCua - 1) < 0.015
        val con4 = (data.GiaDongCua / data.GiaThapNhat - 1) < 0.015
        return con1 && con2 && con3 && con4
    }

    private fun percentAKL(data: DataOneDay): Float {
        return data.percentKLStepUp(aBuocGia)
    }

    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        val resultFromSuper = super.detect(code, date)
        if (resultFromSuper is Right)
            return resultFromSuper

        val dateStr = ConstDefine.SDF.format(date)
        val data = DAO.getDataOneDay(code, dateStr) ?: return Left(ErrorDefine.NO_EXIST_DATA)
        return Right(detect(code, date, data))
    }
}