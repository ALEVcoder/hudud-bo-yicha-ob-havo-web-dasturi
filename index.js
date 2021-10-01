let svgElement = document.querySelector("svg");

svgElement.querySelectorAll("path").forEach(region => {
    region.addEventListener("click", e => {
        let name = region.getAttribute("name")
        

        svgElement.querySelectorAll("path").forEach(element => {
            element.classList.remove("active")
        })

        region.classList.add("active")
        if(name !== null){
            getWeather(name)
                .then(weather => {
                    let min = weather.main.temp_min - 273;
                    let max = weather.main.temp_max - 273;
                
                    let icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                
                    document.querySelector("p").innerHTML =  `Hudud: ${name} | Harorat: ${Math.round(max)}&#176;C`
                    document.querySelector("img").src = icon
                })
                .catch(function(e){
                    alert(e)
                })
        }
    })
})

function getWeather(region){
    return new Promise((resolve, reject) => {
        let response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${region}&APPID=e3040bcd6686712cccd8c6502de28899`)
        response.then(function(data){
            data.json().then(function(weather){
                if(weather.cod === 404){
                    reject("Sahifa Yoq")
                }else{
                    resolve(weather)
                }
            })
        })
    })
}

