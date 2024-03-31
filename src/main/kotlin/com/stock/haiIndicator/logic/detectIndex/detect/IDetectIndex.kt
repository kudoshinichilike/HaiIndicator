package com.stock.haiIndicator.logic.detectIndex.detect

import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.define.ErrorDefine
import com.stock.haiIndicator.logic.detectIndex.DefineDetector
import com.stock.haiIndicator.logic.cacheStore.ResultStore
import com.stock.haiIndicator.payload.res.resEachIndex.SealedResDetect
import com.zps.bitzerokt.utils.some_monad.Either
import com.zps.bitzerokt.utils.some_monad.Left
import com.zps.bitzerokt.utils.some_monad.Right
import java.util.*

interface IDetectIndex {
    suspend fun detect(code: String, date: Date): Either<ErrorDefine, Pair<Boolean, SealedResDetect>> {
        val resultStore = ResultStore.getResult(date, DefineDetector.getEnumFromDetector(this)!!, code)
        return if (resultStore != null)
            Right(Pair(resultStore, SealedResDetect()))
        else
            Left(ErrorDefine.FAIL_FROM_SUPER)
    }
}