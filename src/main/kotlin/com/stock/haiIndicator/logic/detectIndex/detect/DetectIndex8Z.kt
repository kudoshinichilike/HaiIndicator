package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResIndex
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

object DetectIndex8Z: IDetectIndex {
    override suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResIndex>> {
        return Right(Pair(false, SealedResIndex()))
    }
}