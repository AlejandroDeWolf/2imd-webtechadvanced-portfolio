export default class App {
    constructor(API_KEY_WEATHER, API_KEY_RECIPE) {
        this.API_KEY_WEATHER = API_KEY_WEATHER;
        this.API_KEY_RECIPE = API_KEY_RECIPE;
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
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.lat}&lon=${this.long}&appid=${this.API_KEY_WEATHER}`;
        fetch(url)
            .then((res) => {  //function schrijven als de respons goed is aangekomen van de url
                return res.json();
            })
            .then((json) => {
                // console.log(json);
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

        if (temp >= 15) {
            this.getRecipe(0, 10);
        }
        else {
            this.getRecipe(10, 100);
        }
    }

    locationError(error) {
        console.log(error);
    }


    // ----- RECIPE API -----
    getRecipe(minFat, maxFat) {
        // let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.API_KEY_RECIPE}&minFat=${minFat}&maxFat=${maxFat}`;
        // fetch(url)
        //     .then((res) => {  //function schrijven als de respons goed is aangekomen van de url
        //         return res.json();
        //     })
        //     .then((json) => {
        //         console.log(json.results[Math.floor(Math.random() * 10)]);
        //         let recipe = json.results[Math.floor(Math.random() * 10)]
        //         this.printRecipe(recipe);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
        //     .finally(() => {
        //         console.log("finally done");
        //     });

        let staticRecipe = {
            "id": 716381,
            "title": "Nigerian Snail Stew",
            "image": "https://spoonacular.com/recipeImages/716381-312x231.jpg",
            "imageType": "jpg",
            "nutrition": {
                "nutrients": [
                    {
                        "name": "Fat",
                        "amount": 4.7106,
                        "unit": "g"
                    }
                ]
            }
        }
        this.printRecipe(staticRecipe);
    }

    printRecipe(recipe) {
        let recipeTitle = recipe.title;
        // console.log(recipeTitle);
        let recipeImage = recipe.image;
        // console.log(recipeImage);

        document.querySelector("h3").innerHTML = recipeTitle;
        document.querySelector("img").src = recipeImage;
    }
}