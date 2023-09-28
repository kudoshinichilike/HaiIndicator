package com.stock.haiIndicator.logic.detectIndex

import com.stock.haiIndicator.logic.detectIndex.detect.*

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
    Indicate8Z(DetectIndex8Z),
    ;

    companion object {
        private val mapNameToDetector = DefineDetector
                                    .values()
                                    .asSequence()
                                    .map {
                                        Pair(it.name, it.processor)
                                    }
                                    .toMap()

        fun fromName(name: String): IDetectIndex? = mapNameToDetector[name]
    }
}