package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResIndex
import com.zps.bitzerokt.utils.some_monad.Either
import java.util.*

interface IDetectIndex {
    suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResIndex>>
}