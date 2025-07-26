async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await res.json();

    const current = data.current_condition[0];
    const temp = current.temp_C;
    const weatherDesc = current.weatherDesc[0].value;

    document.getElementById("cityName").textContent = `📍 ${city}`;
    document.getElementById("temperature").textContent = `🌡️ ${temp}°C`;
    document.getElementById("condition").textContent = `📋 ${weatherDesc}`;
    document.getElementById("weatherResult").classList.remove("hidden");

  } catch (error) {
    alert("Failed to fetch weather. Try another city.");
    console.error(error);
  }
}
