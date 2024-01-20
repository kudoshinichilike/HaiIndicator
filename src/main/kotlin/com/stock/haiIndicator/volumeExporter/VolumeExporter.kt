package com.stock.haiIndicator.volumeExporter

/***
 * create by: phuongnm5, in 20/1/2024
 * Hôm nay em Việt có nhờ mình lấy khối lượng ATC, vì gs Hải nhờ em ấy lấy, mà sợ tối nay k kịp. Mình muốn làm giúp em.
 * Một phần cũng vì sắp sóng to, mình muốn học.
 * Không biết tương lai như nào. Nhưng cố lên Phương nhé!
 */
object VolumeExporter {
    fun export(code: String, dateStart: String, dateEnd: String) {
        
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