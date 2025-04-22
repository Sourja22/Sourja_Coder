const API_KEY = "7945908bed401655aafac0ffe3bb9f87";

document.getElementById("getWeather").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherSection = document.getElementById("weatherInfo");

  if (!city) {
    return alert("Please enter a city name.");
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      weatherSection.classList.remove("visible");
      alert("City not found!");
      return;
    }
    weatherSection.classList.add("visible");
    //Retrieving the lat and lon to embed with g map
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    document.getElementById("location").innerHTML = `📍 Location: <a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">${data.name}, ${data.sys.country}</a>`;

    //Retrieve the temperature 
  
    document.getElementById("temperature").innerHTML = `🌡️ Temperature: ${data.main.temp}°C`;

    document.getElementById("condition").innerHTML = `🌤️ Condition: ${data.weather[0].description}`;

    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById("icon").alt = data.weather[0].description;

    

  } catch (err) {
    console.error(err);
    weatherSection.classList.remove("visible");
    alert("Error fetching weather data.");
  }
});
