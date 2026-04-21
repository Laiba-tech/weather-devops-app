const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json()); // for potential future POST

app.get("/", (req, res) => {
    res.json({ message: "Weather API is running!" });
});

app.get("/weather", async (req, res) => {
    const city = req.query.city?.trim();
    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "API key not configured" });
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).json({ error: "City not found" });
        }
        console.error("Weather API error:", error.message);
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
