export default class App {
    constructor(API_KEY) {
        this.API_KEY = API_KEY;
        this.lat = 0;
        this.long = 0;
        this.getLocation();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(this.locationSucces.bind(this), this.locationError.bind(this));
    }

    locationSucces(location) {
        this.lat = location.coords.latitude;
        this.long = location.coords.longitude;
        this.getWeather();
    }

    getWeather() {
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.lat}&lon=${this.long}&appid=${this.API_KEY}`;
        fetch(url)
            .then((res) => {  //function schrijven als de respons goed is aangekomen van de url
                return res.json();
            })
            .then((json) => {
                console.log(json);
                this.printWeather(json);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("finally done");
            });
    }

    printWeather(json) {
        let summary = json.weather[0].description;
        let temp = Math.round(json.main.temp);

        document.querySelector("h1").innerHTML = summary;
        document.querySelector("h2").innerHTML = temp + "°";
    }

    locationError(error) {
        console.log(error);
    }
}