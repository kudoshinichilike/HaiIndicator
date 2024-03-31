package com.stock.haiIndicator.logic.volumeExporter

import com.stock.haiIndicator.dataDAO.DAO
import com.stock.haiIndicator.define.ConstDefine
import com.stock.haiIndicator.service.DateValidator
import org.apache.poi.ss.usermodel.Row
import org.apache.poi.ss.usermodel.Sheet
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.slf4j.LoggerFactory
import java.io.FileOutputStream
import java.util.*

/***
 * create by: PhuogNguyen, in 20/1/2024
 * Hôm nay em Việt có nhờ mình lấy khối lượng ATC, vì gs Hải nhờ em ấy lấy, mà sợ tối nay k kịp. Mình muốn làm giúp em.
 * Một phần cũng vì sắp sóng to, mình muốn học.
 * Không biết tương lai như nào. Nhưng cố lên Phương nhé!
 */
object VolumeExporterExl {
    private val logger = LoggerFactory.getLogger(this.javaClass.simpleName)

    suspend fun exportCafeF(dateStartStr: String, dateEndStr: String) {
//        listOf("VIC", "HDG", "NLG", "NVL", "SCR", "KDH", "TDH", "IJC", "ITC", "HQC", "QCG", "TDC", "DXG", "DIG", "DRH",
//            "HDC", "LGL", "NBB", "NTL", "NVT", "PDR", "SJS", "VRE", "CCL", "DTA", "FDC", "HAR", "PTL", "VPH", "VRC",
//            "CCI", "D2D", "ITA", "KBC", "LHG", "SZL", "TIX", "VHM", "HAG", "CRE", "IDI", "NHA", "CEO", "TIG")
//            .forEach { code -> exportCafeF(code, dateStartStr, dateEndStr) }

//        listOf("NKG", "HSG", "HPG", "VGS", "TLH", "VCA")
//            .forEach { code -> exportCafeF(code, dateStartStr, dateEndStr) }

//        listOf("CTG", "BID", "VCB", "VIB", "MBB", "TCB", "TPB", "HDB", "STB", "EIB", "ACB", "MSB", "LPB", "BAB", "SHB")
//            .forEach { code -> exportCafeF(code, dateStartStr, dateEndStr) }

        listOf("TPB", "HDB", "STB", "EIB", "ACB", "MSB", "LPB", "BAB", "SHB")
            .forEach { code -> exportCafeF(code, dateStartStr, dateEndStr) }

        listOf("AGR", "CTS", "BSI", "HCM", "FTS", "SSI", "VCI", "TVS", "VDS", "VND", "VIX", "APS", "BVS", "HBS",
            "EVS", "MBS", "IVS", "SHS", "PSI", "VIG", "TVB")
            .forEach { code -> exportCafeF(code, dateStartStr, dateEndStr) }

//        CodeListDAO.getCodeListromVDS(EnumFloor.HSX).forEach { code -> exportCafeF(code, dateStartStr, dateEndStr) }
//        CodeListDAO.getCodeListFromVDS(EnumFloor.HNX).forEach { code -> exportCafeF(code, dateStartStr, dateEndStr) }
    }

    private fun createSheet(workbook: XSSFWorkbook, code: String): Sheet {
        val sheet: Sheet = workbook.createSheet(code)
        // Create header row
        val headerRow: Row = sheet.createRow(0)
        headerRow.createCell(0).setCellValue("date")
        headerRow.createCell(1).setCellValue("ATO")
        headerRow.createCell(2).setCellValue("Phien2")
        headerRow.createCell(3).setCellValue("ATC")

        return sheet
    }

    suspend fun exportCafeF(code: String, dateStartStr: String, dateEndStr: String) {
        logger.info("exportCafeF $code $dateStartStr $dateEndStr")

        val workbook = XSSFWorkbook()
        val sheet = createSheet(workbook, code)

        try {
            val dateStart = ConstDefine.SDF.parse(dateStartStr)
            val dateEnd = ConstDefine.SDF.parse(dateEndStr)
            val calendar = Calendar.getInstance()
            calendar.time = dateStart
            calendar.add(Calendar.DATE, -1)

            var rowIdx = 0
            while (!calendar.time.after(dateEnd)) {
                calendar.add(Calendar.DATE, 1)
                val currentDate = calendar.time
                val currentDateStr = ConstDefine.SDF.format(currentDate)
                logger.info("exportCafeF currentDate: ${ConstDefine.SDF.format(currentDate)}")
                if (!DateValidator.validateDateDetect(currentDateStr))
                    continue

                var dataOneDate = DAO.getDataOneDay(code, currentDateStr)
                if (dataOneDate == null)
                    dataOneDate = DAO.getDataOneDay(code, currentDateStr)
                if (dataOneDate == null)
                    dataOneDate = DAO.getDataOneDay(code, currentDateStr)

                dataOneDate?.let {
                    rowIdx ++
                    val row: Row = sheet.createRow(rowIdx)
                    row.createCell(0).setCellValue(currentDateStr)
                    row.createCell(1).setCellValue(it.KLATO.toDouble())
                    row.createCell(2).setCellValue(it.KLPhien2.toDouble())
                    row.createCell(3).setCellValue(it.KLATC.toDouble())
                }
            }

            val fileOut = FileOutputStream("volume/chung/$code.xlsx")
            workbook.write(fileOut)
            fileOut.close()
            workbook.close()
        }
        catch (e: Exception) {
            logger.error("VolumeExporter error. ", e)
        }

        logger.info("exportCafeF done")
    }

    fun exportVDS(code: String, dateStart: String, dateEnd: String) {

    }
}

/*
val names = listOf("name1", "name2", "name3")
    val vol1Values = listOf(10, 20, 30)
    val vol2Values = listOf(15, 25, 35)
    val vol3Values = listOf(18, 28, 38)

    // Create a new workbook
    val workbook = XSSFWorkbook()

    // Create a sheet
    val sheet: Sheet = workbook.createSheet("Sheet1")

    // Create header row
    val headerRow: Row = sheet.createRow(0)
    headerRow.createCell(0).setCellValue("Name")
    headerRow.createCell(1).setCellValue("Vol1")
    headerRow.createCell(2).setCellValue("Vol2")
    headerRow.createCell(3).setCellValue("Vol3")

    // Populate data rows
    for ((index, name) in names.withIndex()) {
        val row: Row = sheet.createRow(index + 1)
        row.createCell(0).setCellValue(name)
        row.createCell(1).setCellValue(vol1Values[index].toDouble())
        row.createCell(2).setCellValue(vol2Values[index].toDouble())
        row.createCell(3).setCellValue(vol3Values[index].toDouble())
    }

    // Save the workbook to a file
    val fileOut = FileOutputStream("output.xlsx")
    workbook.write(fileOut)
    fileOut.close()

    // Close the workbook
    workbook.close()

    println("Excel file generated successfully.")
 */