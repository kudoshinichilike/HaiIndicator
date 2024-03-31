package com.stock.haiIndicator.logic.detectIndex

import com.stock.haiIndicator.logic.detectIndex.detect.*
import com.stock.haiIndicator.logic.detectIndex.detect.index1.DetectIndex1
import com.stock.haiIndicator.logic.detectIndex.detect.index5.DetectIndex5
import com.stock.haiIndicator.logic.detectIndex.detect.index5.DetectIndex5VDS
import com.stock.haiIndicator.logic.detectIndex.detect.index5.index5BID.DetectIndex5BID
import com.stock.haiIndicator.logic.detectIndex.detect.index5.index5BID.DetectIndex5BIDVDS
import com.stock.haiIndicator.logic.detectIndex.detect.index5.index5_KhongChuan.DetectIndex5KhongChuan
import com.stock.haiIndicator.logic.detectIndex.detect.index5.index5_KhongChuan.DetectIndex5KhongChuanVDS
import kotlin.math.max

enum class DefineDetector(val processor: IDetectIndex) {
    Indicate1(DetectIndex1),
    Indicate2(DetectIndex2),
    Indicate3(DetectIndex3),
    Indicate4(DetectIndex4),
    Indicate5(DetectIndex5),
    Indicate5_BID(DetectIndex5BID),
    Indicate5_Khong_Chuan(DetectIndex5KhongChuan),
    Indicate6(DetectIndex6),
    Indicate7(DetectIndex7),
//    Indicate8(DetectIndex8),
    Indicate8T(DetectIndex8T),
    Indicate8V(DetectIndex8V),
//    Indicate8Z(DetectIndex8Z),
    ;

    companion object {
        val mapNameToEnum = DefineDetector
            .values()
            .asSequence()
            .map {
                Pair(it.name, it)
            }
            .toMap()

        val mapNameToDetector = DefineDetector
                                    .values()
                                    .asSequence()
                                    .map {
                                        Pair(it.name, it.processor)
                                    }
                                    .toMap()

        val mapDetectorToEnum = DefineDetector
            .values()
            .asSequence()
            .map {
                Pair(it.processor, it)
            }
            .toMap()

        val detectorNeedBefore = mutableMapOf(
                                        DetectIndex1 to 20,
                                        DetectIndex8T to 20,
                                        DetectIndex8V to 20
                                    )

        fun fromName(name: String): IDetectIndex? = mapNameToDetector[name]
        fun getEnumFromName(name: String): DefineDetector? = mapNameToEnum[name]
        fun getEnumFromDetector(detector: IDetectIndex): DefineDetector? {
            if (detector is DetectIndex5BIDVDS)
                return Indicate5_BID
            else if (detector is DetectIndex5VDS)
                return Indicate5
            else if (detector is DetectIndex5KhongChuanVDS)
                return Indicate5_Khong_Chuan

            return mapDetectorToEnum[detector]
        }
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