const API_KEY = "501c3e6279f4fc1d097668991f91798b";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

$(document).ready(function () {
  const $searchBox = $(".search input");
  const $searchBtn = $(".search button");
  const $weatherIcon = $(".weather-icon");
  const $errorElement = $(".error");
  const $weatherElement = $(".weather");
  const $dateInfoElement = $("#date-info");

  // Hava durumunu kontrol et
  function checkWeather(city) {
    if (!city) {
      displayError("Lütfen bir şehir adı giriniz.");
      return;
    }

    $.get(`${API_URL}${city}&appid=${API_KEY}`, function (data) {
      updateWeatherInfo(data);
    }).fail(function () {
      displayError("Bir hata oluştu. Lütfen tekrar deneyiniz.");
    });
  }

  // Hata mesajını göster
  function displayError(message) {
    $errorElement.text(message).show();
    $weatherElement.hide();
  }

  // Hava durumu bilgisini güncelle
  function updateWeatherInfo(data) {
    $(".city").text(data.name);
    $(".temp").text(`${Math.round(data.main.temp)} °C`);
    $(".humidity").text(`${data.main.humidity} %`);
    $(".wind").text(`${data.wind.speed} km/h`);

    updateWeatherIcon(data.weather[0].main);
    updateDateInfo();

    $weatherElement.show();
    $errorElement.hide();
  }

  // Tarih bilgisini güncelle
  function updateDateInfo() {
    const date = new Date();
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("tr-TR", options);
    $dateInfoElement.text(formattedDate);
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

    $weatherIcon.attr("src", iconMap[weatherCondition] || "images/default.png");
  }

  // Arama butonuna tıklama olayını dinle
  $searchBtn.on("click", function () {
    const city = $searchBox.val().trim();
    checkWeather(city);
    $searchBox.val("");
  });

  // Enter tuşuna basıldığında kontrol et
  $searchBox.on("keydown", function (e) {
    if (e.key === "Enter") {
      const city = $searchBox.val().trim();
      checkWeather(city);
      $searchBox.val("");
    }
  });
});
