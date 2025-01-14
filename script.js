const API_KEY = "501c3e6279f4fc1d097668991f91798b";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");
const dateInfoElement = document.querySelector("#date-info");

// Hava durumunu kontrol et
async function checkWeather(city) {
  if (!city) {
    displayError("Lütfen bir şehir adı giriniz.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
    if (!response.ok) {
      displayError("Şehir bulunamadı. Lütfen doğru bir şehir adı giriniz.");
      return;
    }

    const data = await response.json();
    console.log(data);
    updateWeatherInfo(data);
  } catch (error) {
    displayError("Bir hata oluştu. Lütfen tekrar deneyiniz.");
    console.error(error);
  }
}

// Hata mesajını göster
function displayError(message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
  weatherElement.style.display = "none";
}

// Hava durumu bilgisini güncelle
function updateWeatherInfo(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = `${Math.round(
    data.main.temp
  )} °C`;
  document.querySelector(".humidity").textContent = `${data.main.humidity} %`;
  document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

  updateWeatherIcon(data.weather[0].main);

  weatherElement.style.display = "block";
  errorElement.style.display = "none";

  // Tarih bilgisini güncelle
  updateDateInfo();
}

// Tarih bilgisini güncelle
function updateDateInfo() {
  const date = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("tr-TR", options);
  dateInfoElement.textContent = formattedDate;
}

// Hava durumu ikonunu güncelle
function updateWeatherIcon(weatherCondition) {
  const iconMap = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
  };

  weatherIcon.src = iconMap[weatherCondition] || "images/default.png";
}

// Arama butonuna tıklama olayını dinle
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  checkWeather(city);
});

// Enter tuşuna basıldığında kontrol et
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    checkWeather(city);
  }
});
