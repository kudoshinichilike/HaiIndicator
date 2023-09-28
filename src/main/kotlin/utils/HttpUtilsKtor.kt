package utils

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*

object HttpUtilsKtor {
    val httpClient = HttpClient(CIO)

    suspend fun sendPostJson(url: String, body: String): HttpResponse {
        return httpClient.post(url) {
            contentType(ContentType.Application.Json)
            setBody(body)
        }
    }

    suspend inline fun <reified T> sendPostJson(url: String, body: T): HttpResponse {
        println(JsonUtils.encodeToString(body))
        return httpClient.post(url) {
            contentType(ContentType.parse("application/json"))
            setBody(JsonUtils.encodeToString(body))
        }
    }
}