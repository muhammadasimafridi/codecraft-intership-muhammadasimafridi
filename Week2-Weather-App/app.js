const input = document.querySelector("input");
const searchBtn = document.querySelector("button");

searchBtn.addEventListener(("click"), () => {
    let container = document.querySelector(".container");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=f7bb8450695d7af58983467d89af6ed2&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        container.innerHTML += `
            <p class="city-name"><span>${data.name}</span></p>
            <p><span class="heading">Temperature</span><span>${data.main.temp}</span></p>
            <p><span class="heading">Weather Condition</span><span>${data.weather[0].main}</span></p>
            <p><span class="heading">Humidity</span><span>${data.main.humidity}</span></p>
            <p><span class="heading">Wind Speed</span><span>${data.wind.speed}</span></p>
        `;
    })
    .catch(error => {
        console.log(error);
        alert("Wrong name, Search it Again with Correct Name!");
    })
    input.value = "";
})

