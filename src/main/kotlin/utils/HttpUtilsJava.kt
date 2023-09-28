package utils

import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

object HttpUtilsJava {
    fun get(url: String, params: Map<String, String>): HttpResponse<String> {
        val urlParams = params.map {(k, v) -> "$k=$v"}
                            .joinToString("&")
        val client = HttpClient.newBuilder().build()
        val request = HttpRequest.newBuilder()
                        .uri(URI.create("$url?${urlParams}"))
                        .build()

        val response = client.send(request, HttpResponse.BodyHandlers.ofString())
        println(response.body().toString())
        return response
    }
}