import com.stock.haiIndicator.dataDAO.input.DataOneDay
import com.stock.haiIndicator.define.ConstDefine
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import utils.JsonUtils
import java.io.File
import java.io.FileWriter

object FileWriter {
    val logger: Logger = LoggerFactory.getLogger("FileWriter")
    fun writeDataOneDay(code: String, date: String, data: DataOneDay) {
        val directoryPath = ConstDefine.prePathLoad + "cafeF/$code/"
        val filePath = "${directoryPath}$code$date.json"

        val directory = File(directoryPath)
        if (!directory.exists()) {
            directory.mkdirs()
        }

        try {
            val dataStr = JsonUtils.encodeToString(data)
            val file = File(filePath)
            val fileWriter = FileWriter(file)
            fileWriter.write(dataStr)
            fileWriter.close()
        } catch (e: Exception) {
            logger.error("FileWriter readDataOneDay $code $date", e)
        }
    }

    fun writeToFile(filePath: String, data: String) {
        try {
            val file = File(ConstDefine.prePathLoad + filePath)
            val fileWriter = FileWriter(file)
            fileWriter.write(data)
            fileWriter.close()
        } catch (e: Exception) {
            logger.error("writeToFile filePath: $filePath", e)
        }
    }
}