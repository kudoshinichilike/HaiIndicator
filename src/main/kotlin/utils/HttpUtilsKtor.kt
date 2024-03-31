package utils

import com.stock.haiIndicator.logger.GLLogger
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*

object HttpUtilsKtor {
    val httpClient = HttpClient(CIO) {
        install(HttpTimeout) {
            requestTimeoutMillis = 10000
        }
    }

    suspend fun sendPostJson(url: String, body: String): HttpResponse {
        return httpClient.post(url) {
            contentType(ContentType.Application.Json)
            setBody(body)
        }
    }

    suspend inline fun <reified T> sendPostJson(url: String, body: T): HttpResponse {
        GLLogger.logger.info("sendPostJson ${JsonUtils.encodeToString(body)}")
        return httpClient.post(url) {
            contentType(ContentType.parse("application/json"))
            setBody(JsonUtils.encodeToString(body))
        }
    }

    suspend fun get(url: String, param: Map<String, String>): HttpResponse {
        return httpClient.get(url) {
            url {
                param.forEach{
                    parameters.append(it.key, it.value)
                }
            }
        }
    }
}