package utils

import kotlinx.serialization.KSerializer
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import java.io.File

/**
 * Class này dùng kotlinx.serialization để encode / decode
 *
 * Ưu điểm:
 * - Không dùng reflection để tương thích với Kotlin/JS, Kotlin/Native...
 * - Trong lúc decode sẽ chạy block init{}
 *
 * Nhược điểm:
 * - Phải thêm @Serializable vào tất cả lớp cha thì mới encode được thuộc tính của lớp cha
 * - Phải dùng KSerializer thì mới encode được cái object bất kỳ
 *
 * Chú ý:
 * - Trong lúc decode sẽ chạy block init{}, cần kiểm tra code xem các block init{} chạy nhiều lần sẽ ảnh hưởng gì
 */

object JsonUtils {
    val JSON = Json {
        encodeDefaults = true
        ignoreUnknownKeys = true
        allowStructuredMapKeys = true

    }
    val JSON_PRETTY = Json {
        encodeDefaults = true
        ignoreUnknownKeys = true
        prettyPrint = true
    }

    inline fun <reified T> decodeFromString(json: String): T {
        return JSON.decodeFromString(json)
    }

    inline fun <reified T> decodeFromFile(fileName: String): T {
        val pathLoad = System.getProperty("user.dir") + "/data/" + fileName
//        val pathLoad = "/home/phuongnm5/toolAnhHai/data/" + fileName //live
        val str = File(pathLoad).readText(Charsets.UTF_8)
        return JSON.decodeFromString(str)
    }

    fun checkExistFile(fileName: String): Boolean {
        val pathLoad = System.getProperty("user.dir") + "/data/" + fileName
//        val pathLoad = "/home/phuongnm5/toolAnhHai/data/" + fileName //live
        val file = File(pathLoad)
        return file.exists()
    }

    fun parseToJsonElement (json: String): JsonElement {
        return JSON.parseToJsonElement(json)
    }

    inline fun <reified T> encodeToString(value: T): String {
        return JSON.encodeToString(value)
    }

    /**
     * Ex: encodeToString(serializer(typeOf<Map<Int, ItemInfo>>()), mapIdToItemInfo)
     */
    inline fun <reified T> encodeToString(s: KSerializer<Any?>, value: T): String {
        return JSON.encodeToString(s, value)
    }

    inline fun <reified T> encodeToStringPretty(value: T): String {
        return JSON_PRETTY.encodeToString(value)
    }

    /**
     * Ex: encodeToStringPretty(serializer(typeOf<Map<Int, ItemInfo>>()), mapIdToItemInfo)
     */
    inline fun <reified T> encodeToStringPretty(s: KSerializer<Any?>, value: T): String {
        return JSON_PRETTY.encodeToString(s, value)
    }
}