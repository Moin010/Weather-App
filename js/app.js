const cityNameForm = document.querySelector("form");
const card = document.querySelector(".card")
const details = document.querySelector(".details")
const icon = document.querySelector(".icon img")
const timeImg = document.querySelector("img.time")

// update UI with the fetched data
const updateUI = (data) => {

    const {cityData, weatherData} = data;

    // details area
    details.innerHTML = `
        <h5 class="my-3">${cityData.EnglishName}</h5>
        <div class="my-3">${weatherData.WeatherText}</div>
        <div class=" display-4 my-4">
            <span>${weatherData.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `

    // remove display none class
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }
 
    // day and night image and Icon

    let timeSrc = null;

    timeSrc = weatherData.IsDayTime ? "img/day.svg" : "img/night.svg";
    timeImg.setAttribute("src", timeSrc);


    const iconSrc = `img/icons/${weatherData.WeatherIcon}.svg`
    icon.setAttribute("src", iconSrc);
}

const updateCity = async (city) => {

    const cityData = await getCity(city);
    const weatherData = await getWeather(cityData.Key);

    return { cityData, weatherData } 
}

cityNameForm.addEventListener("submit", e =>{

    // stop reloading the page
    e.preventDefault();

    // get city name
    const city = cityNameForm.city.value.trim();
    cityNameForm.reset();

    // Update city name in UI
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));


    // set local storage

    localStorage.setItem("city" , city);

})

if(localStorage.getItem("city")){
    updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
        .catch( err => console.log(err));
}
