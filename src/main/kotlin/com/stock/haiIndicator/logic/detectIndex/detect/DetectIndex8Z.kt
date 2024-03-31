package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex8Z: IDetectIndex {
    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        val resultFromSuper = super.detect(code, date)
        if (resultFromSuper is Right)
            return resultFromSuper

        return Right(Pair(false, SealedResDetect()))
    }
}