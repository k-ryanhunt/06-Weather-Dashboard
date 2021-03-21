var searchButton = $(".searchButton");
var apiKey = "40ad46380b6d8c16e4ee5168aa8adc07";

for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);
  var cityName = $(".list-group").addClass("list-group-item");
  cityName.append("<li>" + city + "</li>");
}
searchButton.click(function () {
  var searchInput = $(".searchInput").val();
  let urlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchInput +
    "&Appid=" +
    apiKey +
    "&units=imperial";

  if (searchInput == "") {
  } else {
    fetch(urlCurrent, { method: "GET" })
      .then(function (data) {
        return data.json();
      })
      .then(function (response) {
        var cityName = $(".list-group").addClass("list-group-item");
        var keyCount = 0;
        cityName.append("<li>" + response.name + "</li>");
        localStorage.setItem(keyCount, response.name);
        keyCount = keyCount + 1;

        var currentCard = $(".currentCard").append("<div>").addClass("card-body");
        var currentName = currentCard.append("<h1>");
        var currentTime = moment().format("MMMM Do");
        currentCard.empty();
        currentCard.append (
            "<h1>" + response.name + "</h1>" +
            "<h4>" + currentTime + "</h4>" +
            `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">` +
            "<li>" + "Temperature: " + response.main.temp + "°F" + "</li>" +
            "<li>" + "Humidity: " + response.main.humidity + "%" + "</li>" +
            "<li>" + "Wind Speed: " + response.wind.speed + "</li>"
        );
    
        var currentTemp = currentName;

        let urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=40ad46380b6d8c16e4ee5168aa8adc07&lat=${response.coord.lat}&lon=${response.coord.lon}`;

        fetch(urlUV, { method: "GET" })
          .then(function (data) {
            return data.json();
          })
          .then(function (response) {
            var currentUV = currentTemp.append("<li>" + "UV Index: " + response.value + "</li>").addClass("card-text");
            currentUV.addClass("indicator");
            currentTemp.append(currentUV);
            var UVindex = document.querySelector(".indicator");
            if (response.value >= 6) {
                UVindex.style.borderColor = "red";
            } else if (response.value <= 3) {
                UVindex.style.borderColor = "green";
            } else {
                UVindex.style.borderColor = "yellow";
            }
          });
      });
  }

  let urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

  fetch(urlFiveDay, { method: "GET" })
    .then(function (data) {
      return data.json();
    })
    .then(function (response) {
      var day = [0, 8, 16, 24, 32];
      var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
      fiveDayDiv.empty();
      day.forEach(function (i) {
        var fiveDayTimeUTC1 = moment((response.list[i].dt * 1000)).format("MMMM Do");

        fiveDayDiv.append(
        "<div class=fiveDayColor>" +
            "<li>" + fiveDayTimeUTC1 + "</li>" +
            "<li>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "</li>" +
            "<li>" + "Temp: " + response.list[i].main.temp + "°F" + "</li>" +
            "<li>" + "Humidity: " + response.list[i].main.humidity + "%" + "</li>" +
        "</div>"
        );
      });
    });
});
