package utils

fun Double.roundToTwoDecimal(): Double {
    return String.format("%.2f", this).toDouble()
}

object NumberUtils {
}