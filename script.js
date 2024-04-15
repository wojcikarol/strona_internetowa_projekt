window.onload = function () {
    pobierzDanePogodowe("Tarnow,PL");
};

function szukajPogody() {
    const miasto = document.getElementById("formGroupExampleInput").value;
    if (miasto.trim() === "") {
        alert("Proszę wprowadzić miasto.");
        return;
    }
    pobierzDanePogodowe(miasto);
}

function pobierzDanePogodowe(miasto) {
    const kluczAPI = "749561a315b14523a8f5f1ef95e45864";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${miasto}&units=metric&APPID=${kluczAPI}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tile1 = document.getElementById("tile1");
            tile1.innerHTML = `
                <div id="weatherInfo">
                    <p class="miasto">${data.name}</p>
                    <div class="form-group"> 
                        <input type="text" class="form-control custom-input" id="formGroupExampleInput" placeholder="Wpisz miasto">         
                        <div class="custom-input-decorator"></div>
                        <button id="searchButton" onclick="szukajPogody()" class="custom-button">Szukaj</button>
                    </div>
                </div>
                <div style="clear: both;"></div>
                <p class="godzina">Pogoda teraz - dzisiaj godz. ${new Date().toLocaleTimeString()} <img src="img/sun.png"> ${formatTime(new Date(data.sys.sunrise * 1000))} <img src="img/moon.png"> ${formatTime(new Date(data.sys.sunset * 1000))}</p>
                <div style="clear: both;"></div>
                <div class="ikona"><img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Ikona Pogody"> ${data.main.temp}°C </div>
                <div class="inne">
                    <div class="dane">
                        <p>ODCZUWALNA</p> 
                        <a class="d">${data.main.feels_like}°C</a>
                    </div>
                    <div class="dane">
                        <p class="cisnienie">CIŚNIENIE</p> 
                        <a class="d">${data.main.pressure}hPa</a>
                    </div>
                    <div class="dane">
                        <p class="wiatr">PRĘDKOŚĆ WIATRU</p>
                        <a class="d">${data.wind.speed}m/s</a>
                    </div>
                </div>`;
            
            aktualizujTabelePogody(data);
        })
        .catch(error => {
            console.error('Błąd podczas pobierania danych pogodowych:', error);
            const tile1 = document.getElementById("tile1");
            tile1.innerHTML = `<p>Błąd podczas pobierania danych pogodowych. Proszę spróbuj ponownie później.</p>`;
        });
        
    function formatTime(date) {
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
}

function aktualizujTabelePogody(data) {
    const miejsca = document.querySelectorAll("#pogodana3 tbody tr");

    miejsca.forEach((miejsce, index) => {
        const tempDzisiaj = data.main.temp;
        const tempJutro = Math.floor(Math.random() * 10) + tempDzisiaj - 5;
        const tempWtorek = Math.floor(Math.random() * 10) + tempDzisiaj - 5;

        const komorki = miejsce.querySelectorAll("td");
        
    });
}


document.getElementById("pogodana3").addEventListener("click", function() {
    window.location.href = "pogodana3.html";
});
document.getElementById("Burze").addEventListener("click", function() {
    window.location.href = "burze.html";
});
