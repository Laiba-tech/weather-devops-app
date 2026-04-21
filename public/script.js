document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const weatherCard = document.getElementById('weatherCard');
    const cityName = document.querySelector('.city-name');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const historyList = document.getElementById('historyList');
    const historySection = document.getElementById('history');

    let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

    // Load history
    renderHistory();

    // Event listeners
    searchBtn.addEventListener('click', getWeather);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') getWeather();
    });

    function showLoading() {
        loading.classList.remove('hidden');
        error.classList.add('hidden');
        weatherCard.classList.add('hidden');
    }

    function hideLoading() {
        loading.classList.add('hidden');
    }

    function showError(message) {
        error.textContent = message;
        error.classList.remove('hidden');
        weatherCard.classList.add('hidden');
        hideLoading();
    }

    function showWeather(data) {
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;
        
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.src = iconUrl;
        
        weatherCard.classList.remove('hidden');
        error.classList.add('hidden');
        hideLoading();

        // Add to history
        addToHistory(data.name);
    }

    async function getWeather() {
        const city = cityInput.value.trim();
        if (!city) {
            showError('Please enter a city name');
            return;
        }

        showLoading();

        try {
            const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            showWeather(data);
        } catch (err) {
            showError(err.message);
        }
    }

    function addToHistory(city) {
        const timestamp = new Date().toLocaleString();
        searchHistory.unshift({ city, timestamp });
        searchHistory = searchHistory.slice(0, 10); // Keep last 10
        localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
        renderHistory();
    }

    function renderHistory() {
        historyList.innerHTML = '';
        searchHistory.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.city} (${item.timestamp})`;
            li.addEventListener('click', () => {
                cityInput.value = item.city;
                getWeather();
            });
            historyList.appendChild(li);
        });

        historySection.classList.toggle('hidden', searchHistory.length === 0);
    }
});
