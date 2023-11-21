package com.stock.haiIndicator.logic.detectIndex

import com.stock.haiIndicator.bean.ErrorDefine
import com.stock.haiIndicator.logic.detectIndex.detect.*
import com.zps.bitzerokt.utils.some_monad.Left
import kotlin.math.max

enum class DefineDetector(val processor: IDetectIndex) {
    Indicate1(DetectIndex1),
    Indicate2(DetectIndex2),
    Indicate3(DetectIndex3),
    Indicate4(DetectIndex4),
    Indicate5(DetectIndex5),
    Indicate6(DetectIndex6),
    Indicate7(DetectIndex7),
    Indicate8(DetectIndex8),
    Indicate8T(DetectIndex8T),
    Indicate8V(DetectIndex8V),
//    Indicate8Z(DetectIndex8Z),
    ;

    companion object {
        val mapNameToDetector = DefineDetector
                                    .values()
                                    .asSequence()
                                    .map {
                                        Pair(it.name, it.processor)
                                    }
                                    .toMap()

        val detectorNeedBefore = mutableMapOf(
                                        DetectIndex1 to 20,
                                        DetectIndex8T to 20,
                                        DetectIndex8V to 20
                                    )

        fun fromName(name: String): IDetectIndex? = mapNameToDetector[name]
        fun getNeedDateBf(indicatorNameList: List<String>): Int {
            var numDateNeed = 0
            indicatorNameList.forEach { indicatorName ->
                val detector = DefineDetector.fromName(indicatorName)
                if (detector != null)
                    numDateNeed = max(numDateNeed, detectorNeedBefore.getOrDefault(detector, 0))
            }
            return numDateNeed
        }
    }
}