import com.stock.haiIndicator.dataDAO.input.DataOneDay
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import utils.JsonUtils

object FileReader {
    val logger: Logger = LoggerFactory.getLogger("FileReader")
    fun readDataOneDay(code: String, date: String): DataOneDay? {
        val fileName = "cafeF/$code/$code$date.json"
        if (!JsonUtils.checkExistFile(fileName))
            return null

        try {
            return JsonUtils.decodeFromFile<DataOneDay>(fileName)
        } catch (e: Exception) {
            logger.error("Exception readDataOneDay $code $date", e)
            return null
        }
    }
}