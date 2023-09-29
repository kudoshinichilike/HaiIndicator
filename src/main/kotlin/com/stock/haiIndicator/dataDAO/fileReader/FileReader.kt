import com.stock.haiIndicator.dataDAO.input.DataOneDay
import utils.JsonUtils

object FileReader {
    fun readDataOneDay(code: String, date: String): DataOneDay? {
        val fileName = "cafeF/$code/$code$date.json"
        if (!JsonUtils.checkExistFile(fileName))
            return null

        try {
            val dataOneDay = JsonUtils.decodeFromFile<DataOneDay>(fileName)
            if (!dataOneDay.dataError)
                return dataOneDay
            else
                return null
        } catch (e: Exception) {
            e.printStackTrace()
            return null
        }
    }
}