package com.thinkheadlabs.qrscancraft.qrcode.qrscanner.qrgenerator.qrdesigner

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.graphics.drawable.BitmapDrawable
import android.util.Base64
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise
import com.github.alexzhirkevich.customqrgenerator.QrData
import com.github.alexzhirkevich.customqrgenerator.QrErrorCorrectionLevel
import com.github.alexzhirkevich.customqrgenerator.vector.QrCodeDrawable
import com.github.alexzhirkevich.customqrgenerator.vector.createQrVectorOptions
import com.github.alexzhirkevich.customqrgenerator.vector.style.*
import java.io.ByteArrayOutputStream

class CustomQRGeneratorModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "CustomQRGenerator"
    }

    @ReactMethod
    fun generateQRCode(data: ReadableMap, options: ReadableMap?, promise: Promise) {
        try {
            // Step 1: Parse QR data based on type
            val type = data.getString("type") ?: "Text"
            val qrData = when (type) {
                "Url" -> QrData.Url(data.getString("value") ?: "")
                "Text" -> QrData.Text(data.getString("value") ?: "")
                "Email" -> QrData.Email(
                    email = data.getString("email") ?: "",
                    copyTo = if (data.hasKey("copyTo")) data.getString("copyTo") else null,
                    subject = if (data.hasKey("subject")) data.getString("subject") else null,
                    body = if (data.hasKey("body")) data.getString("body") else null
                )
                "Phone" -> QrData.Phone(data.getString("phoneNumber") ?: "")
                "GeoPos" -> {
                    if (!data.hasKey("lat") || !data.hasKey("lon")) {
                        throw IllegalArgumentException("Latitude and longitude are required for GeoPos")
                    }
                    QrData.GeoPos(data.getDouble("lat").toFloat(), data.getDouble("lon").toFloat())
                }
                "WiFi" -> {
                    if (!data.hasKey("ssid")) {
                        throw IllegalArgumentException("SSID is required for WiFi")
                    }
                    QrData.Wifi(
                        ssid = data.getString("ssid"),
                        psk = if (data.hasKey("psk")) data.getString("psk") else null,
                        hidden = if (data.hasKey("hidden")) data.getBoolean("hidden") else false,
                        authentication = when (data.getString("authentication") ?: "WPA") {
                            "WEP" -> QrData.Wifi.Authentication.WEP
                            "WPA" -> QrData.Wifi.Authentication.WPA
                            "NONE" -> QrData.Wifi.Authentication.OPEN
                            else -> QrData.Wifi.Authentication.WPA
                        }
                    )
                }
                "EnterpriseWifi" -> {
                    if (!data.hasKey("ssid")) {
                        throw IllegalArgumentException("SSID is required for EnterpriseWifi")
                    }
                    QrData.EnterpriseWifi(
                        ssid = data.getString("ssid"),
                        psk = if (data.hasKey("psk")) data.getString("psk") else null,
                        user = if (data.hasKey("user")) data.getString("user") else null,
                        eap = if (data.hasKey("eap")) data.getString("eap") else null,
                        phase = if (data.hasKey("phase")) data.getString("phase") else null,
                        hidden = if (data.hasKey("hidden")) data.getBoolean("hidden") else false
                    )
                }
                "Bookmark" -> {
                    if (!data.hasKey("url")) {
                        throw IllegalArgumentException("URL is required for Bookmark")
                    }
                    (if (data.hasKey("title")) data.getString("title") else "")?.let {
                        QrData.Bookmark(
                            url = data.getString("url") ?: "",
                            title = it
                        )
                    }
                }
                "SMS" -> {
                    if (!data.hasKey("phoneNumber")) {
                        throw IllegalArgumentException("Phone number is required for SMS")
                    }
                    (if (data.hasKey("subject")) data.getString("subject") else "")?.let {
                        QrData.SMS(
                            phoneNumber = data.getString("phoneNumber") ?: "",
                            subject = it,
                            isMMS = if (data.hasKey("isMMS")) data.getBoolean("isMMS") else false
                        )
                    }
                }
                "BizCard" -> {
                    if (!data.hasKey("firstName")) {
                        throw IllegalArgumentException("First name is required for BizCard")
                    }
                    QrData.BizCard(
                        firstName = data.getString("firstName"),
                        secondName = if (data.hasKey("secondName")) data.getString("secondName") else null,
                        job = if (data.hasKey("job")) data.getString("job") else null,
                        company = if (data.hasKey("company")) data.getString("company") else null,
                        address = if (data.hasKey("address")) data.getString("address") else null,
                        phone = if (data.hasKey("phone")) data.getString("phone") else null,
                        email = if (data.hasKey("email")) data.getString("email") else null
                    )
                }
                "VCard" -> {
                    if (!data.hasKey("name")) {
                        throw IllegalArgumentException("Name is required for VCard")
                    }
                    QrData.VCard(
                        name = data.getString("name"),
                        company = if (data.hasKey("company")) data.getString("company") else null,
                        title = if (data.hasKey("title")) data.getString("title") else null,
                        phoneNumber = if (data.hasKey("phoneNumber")) data.getString("phoneNumber") else null,
                        email = if (data.hasKey("email")) data.getString("email") else null,
                        address = if (data.hasKey("address")) data.getString("address") else null,
                        website = if (data.hasKey("website")) data.getString("website") else null,
                        note = if (data.hasKey("note")) data.getString("note") else null
                    )
                }
                "MeCard" -> {
                    if (!data.hasKey("name")) {
                        throw IllegalArgumentException("Name is required for MeCard")
                    }
                    QrData.MeCard(
                        name = data.getString("name"),
                        address = if (data.hasKey("address")) data.getString("address") else null,
                        phoneNumber = if (data.hasKey("phoneNumber")) data.getString("phoneNumber") else null,
                        email = if (data.hasKey("email")) data.getString("email") else null
                    )
                }
                "YouTube" -> {
                    if (!data.hasKey("videoId")) {
                        throw IllegalArgumentException("Video ID is required for YouTube")
                    }
                    QrData.YouTube(data.getString("videoId") ?: "")
                }
                "Event" -> {
                    if (!data.hasKey("summary")) {
                        throw IllegalArgumentException("Summary is required for Event")
                    }
                    QrData.Event(
                        uid = if (data.hasKey("uid")) data.getString("uid") else null,
                        stamp = if (data.hasKey("stamp")) data.getString("stamp") else null,
                        organizer = if (data.hasKey("organizer")) data.getString("organizer") else null,
                        start = if (data.hasKey("start")) data.getString("start") else null,
                        end = if (data.hasKey("end")) data.getString("end") else null,
                        summary = data.getString("summary")
                    )
                }
                "GooglePlay" -> {
                    if (!data.hasKey("appPackage")) {
                        throw IllegalArgumentException("App package is required for GooglePlay")
                    }
                    QrData.GooglePlay(data.getString("appPackage") ?: "")
                }
                else -> QrData.Text(data.getString("value") ?: "")
            }

            // Step 2: Parse options from ReadableMap
            val qrOptions = createQrVectorOptions {
                if (options?.hasKey("padding") == true) {
                    padding = options.getDouble("padding").toFloat()
                }
                if (options?.hasKey("errorCorrectionLevel") == true) {
                    errorCorrectionLevel = when (options.getString("errorCorrectionLevel")) {
                        "Low" -> QrErrorCorrectionLevel.Low
                        "Medium" -> QrErrorCorrectionLevel.Medium
                        "Quartile" -> QrErrorCorrectionLevel.MediumHigh
                        "High" -> QrErrorCorrectionLevel.High
                        else -> QrErrorCorrectionLevel.Medium
                    }
                }
                if (options?.hasKey("logo") == true) {
                    val logoMap = options.getMap("logo")!!
                    logo {
                        if (logoMap.hasKey("base64")) {
                            val base64String = logoMap.getString("base64")
                            if (base64String != null) {
                                try {
                                    val decodedBytes = Base64.decode(base64String, Base64.DEFAULT)
                                    val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
                                        ?: throw IllegalArgumentException("Invalid logo Base64 string")
                                    drawable = BitmapDrawable(reactContext.resources, bitmap)
                                } catch (e: IllegalArgumentException) {
                                    throw IllegalArgumentException("Failed to decode logo Base64: ${e.message}")
                                }
                            }
                        }
                        if (logoMap.hasKey("size")) size = logoMap.getDouble("size").toFloat()
                        if (logoMap.hasKey("padding")) {
                            padding = QrVectorLogoPadding.Natural(logoMap.getDouble("padding").toFloat())
                        }
                        if (logoMap.hasKey("shape")) {
                            shape = when (logoMap.getString("shape")) {
                                "Circle" -> QrVectorLogoShape.Circle
                                "Square" -> QrVectorLogoShape.Default
                                else -> QrVectorLogoShape.Default
                            }
                        }
                    }
                }
                if (options?.hasKey("background") == true) {
                    val bgMap = options.getMap("background")!!
                    background {
                        if (bgMap.hasKey("base64")) {
                            val base64String = bgMap.getString("base64")
                            if (base64String != null) {
                                try {
                                    val decodedBytes = Base64.decode(base64String, Base64.DEFAULT)
                                    val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
                                        ?: throw IllegalArgumentException("Invalid background Base64 string")
                                    drawable = BitmapDrawable(reactContext.resources, bitmap)
                                } catch (e: IllegalArgumentException) {
                                    throw IllegalArgumentException("Failed to decode background Base64: ${e.message}")
                                }
                            }
                        }
                        if (bgMap.hasKey("color")) {
                            try {
                                color = QrVectorColor.Solid(Color.parseColor(bgMap.getString("color")))
                            } catch (e: IllegalArgumentException) {
                                throw IllegalArgumentException("Invalid background color format: ${e.message}")
                            }
                        }
                    }
                }
                if (options?.hasKey("colors") == true) {
                    val colorsMap = options.getMap("colors")!!
                    colors {
                        if (colorsMap.hasKey("dark")) {
                            val darkMap = colorsMap.getMap("dark")!!
                            dark = parseColor(darkMap)
                        }
                        if (colorsMap.hasKey("ball")) {
                            val ballMap = colorsMap.getMap("ball")!!
                            ball = parseColor(ballMap)
                        }
                        if (colorsMap.hasKey("frame")) {
                            val frameMap = colorsMap.getMap("frame")!!
                            frame = parseColor(frameMap)
                        }
                    }
                }
                if (options?.hasKey("shapes") == true) {
                    val shapesMap = options.getMap("shapes")!!
                    shapes {
                        if (shapesMap.hasKey("darkPixel")) {
                            val pixelMap = shapesMap.getMap("darkPixel")!!
                            darkPixel = parseShape(pixelMap, "darkPixel") as QrVectorPixelShape
                        }
                        if (shapesMap.hasKey("ball")) {
                            val ballMap = shapesMap.getMap("ball")!!
                            ball = parseShape(ballMap, "ball") as QrVectorBallShape
                        }
                        if (shapesMap.hasKey("frame")) {
                            val frameMap = shapesMap.getMap("frame")!!
                            frame = parseShape(frameMap, "frame") as QrVectorFrameShape
                        }
                    }
                }
            }

            // Step 3: Generate QR code drawable
            val drawable = qrData?.let { QrCodeDrawable(it, qrOptions) }
            val bitmap = Bitmap.createBitmap(512, 512, Bitmap.Config.ARGB_8888)
            val canvas = android.graphics.Canvas(bitmap)
            if (drawable != null) {
                drawable.setBounds(0, 0, 512, 512)
            }
            if (drawable != null) {
                drawable.draw(canvas)
            }

            // Step 4: Convert to Base64
            val stream = ByteArrayOutputStream()
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
            val base64Image = Base64.encodeToString(stream.toByteArray(), Base64.DEFAULT)
            promise.resolve(base64Image)
        } catch (e: IllegalArgumentException) {
            promise.reject("QR_GENERATION_ERROR", e.message)
        } catch (e: Exception) {
            promise.reject("QR_GENERATION_ERROR", "Unexpected error: ${e.message}")
        }
    }

    private fun parseColor(colorMap: ReadableMap): QrVectorColor {
        return when (colorMap.getString("type")) {
            "Solid" -> {
                if (!colorMap.hasKey("color")) throw IllegalArgumentException("Color is required for Solid type")
                QrVectorColor.Solid(Color.parseColor(colorMap.getString("color")))
            }
            "LinearGradient" -> {
                if (!colorMap.hasKey("colors")) throw IllegalArgumentException("Colors array is required for LinearGradient")
                val colorsArray = colorMap.getArray("colors")!!
                val colors = (0 until colorsArray.size()).map { i ->
                    val pair = colorsArray.getMap(i)!!
                    if (!pair.hasKey("position") || !pair.hasKey("color")) {
                        throw IllegalArgumentException("Color and position are required for gradient colors")
                    }
                    pair.getDouble("position").toFloat() to Color.parseColor(pair.getString("color"))
                }
                QrVectorColor.LinearGradient(
                    colors = colors,
                    orientation = when (colorMap.getString("orientation")) {
                        "Horizontal" -> QrVectorColor.LinearGradient.Orientation.Horizontal
                        "Vertical" -> QrVectorColor.LinearGradient.Orientation.Vertical
                        "LeftDiagonal" -> QrVectorColor.LinearGradient.Orientation.LeftDiagonal
                        "RightDiagonal" -> QrVectorColor.LinearGradient.Orientation.RightDiagonal
                        else -> QrVectorColor.LinearGradient.Orientation.LeftDiagonal
                    }
                )
            }
            "RadialGradient" -> {
                if (!colorMap.hasKey("colors")) throw IllegalArgumentException("Colors array is required for RadialGradient")
                val colorsArray = colorMap.getArray("colors")!!
                val colors = (0 until colorsArray.size()).map { i ->
                    val pair = colorsArray.getMap(i)!!
                    if (!pair.hasKey("position") || !pair.hasKey("color")) {
                        throw IllegalArgumentException("Color and position are required for gradient colors")
                    }
                    pair.getDouble("position").toFloat() to Color.parseColor(pair.getString("color"))
                }
                QrVectorColor.RadialGradient(
                    colors = colors,
                    radius = if (colorMap.hasKey("radius")) colorMap.getDouble("radius").toFloat() else 0.5f
                )
            }
            "SweepGradient" -> {
                if (!colorMap.hasKey("colors")) throw IllegalArgumentException("Colors array is required for SweepGradient")
                val colorsArray = colorMap.getArray("colors")!!
                val colors = (0 until colorsArray.size()).map { i ->
                    val pair = colorsArray.getMap(i)!!
                    if (!pair.hasKey("position") || !pair.hasKey("color")) {
                        throw IllegalArgumentException("Color and position are required for gradient colors")
                    }
                    pair.getDouble("position").toFloat() to Color.parseColor(pair.getString("color"))
                }
                object : QrVectorColor {
                    override fun createPaint(width: Float, height: Float): android.graphics.Paint =
                        android.graphics.Paint().apply {
                            shader = android.graphics.SweepGradient(
                                width / 2, height / 2,
                                colors.map { it.second }.toIntArray(),
                                colors.map { it.first }.toFloatArray()
                            )
                        }
                }
            }
            else -> QrVectorColor.Solid(Color.BLACK)
        }
    }

    private fun parseShape(shapeMap: ReadableMap, type: String): QrVectorShapeModifier {
        return when (shapeMap.getString("type")) {
            "RoundCorners" -> {
                val corner = if (shapeMap.hasKey("corner")) shapeMap.getDouble("corner").toFloat() else 0.5f
                when (type) {
                    "darkPixel" -> QrVectorPixelShape.RoundCorners(corner)
                    "ball" -> QrVectorBallShape.RoundCorners(corner)
                    "frame" -> QrVectorFrameShape.RoundCorners(corner)
                    else -> QrVectorPixelShape.Default
                }
            }
            "Default" -> {
                when (type) {
                    "darkPixel" -> QrVectorPixelShape.Default
                    "ball" -> QrVectorBallShape.Default
                    "frame" -> QrVectorFrameShape.Default
                    else -> QrVectorPixelShape.Default
                }
            }
            else -> QrVectorPixelShape.Default
        }
    }
}