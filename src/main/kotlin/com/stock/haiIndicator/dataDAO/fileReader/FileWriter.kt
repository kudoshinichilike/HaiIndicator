import com.stock.haiIndicator.dataDAO.input.DataOneDay
import utils.JsonUtils
import java.io.File

object FileWriter {
    fun writeDataOneDay(code: String, date: String, data: DataOneDay) {
        val fileName = "cafeF/$code/$code$date.json"
        val pathLoad = System.getProperty("user.dir") + "/data/" + fileName

        try {
            val dataStr = JsonUtils.encodeToString(data)
            File(pathLoad).writeText(dataStr, Charsets.UTF_8)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}