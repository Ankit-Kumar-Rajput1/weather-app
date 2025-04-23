async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "12957043e5fcd00fa20daa28a40ae4ab";
  const weatherData = document.getElementById("weatherData");

  if (!city) {
    weatherData.innerHTML = `<p>Please enter a city or village name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    weatherData.innerHTML = `<p>Loading...</p>`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      weatherData.innerHTML = `<p>❌ ${data.message}</p>`;
      return;
    }

    const icon = data.weather[0].icon;
    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${data.weather[0].description}">
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>🌡 <strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p>💨 <strong>Wind:</strong> ${data.wind.speed} m/s</p>
      <p>💧 <strong>Humidity:</strong> ${data.main.humidity}%</p>
    `;

    weatherData.innerHTML = weatherHTML;
  } catch (error) {
    weatherData.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    console.error(error);
  }
}
