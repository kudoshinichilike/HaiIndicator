import com.stock.haiIndicator.dataDAO.input.DataOneDay
import utils.JsonUtils
import java.io.File
import java.io.FileWriter

object FileWriter {
    fun writeDataOneDay(code: String, date: String, data: DataOneDay) {
        val directoryPath = System.getProperty("user.dir") + "/data/" + "cafeF/$code/"
//        val directoryPath = "/home/phuongnm5/toolAnhHai/data/cafeF/$code/" //live
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
            e.printStackTrace()
        }
    }
}