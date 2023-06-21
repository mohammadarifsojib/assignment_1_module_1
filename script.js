
    const submit = document.getElementById('check-weather')

    submit.addEventListener('click', function(){
        const location = document.getElementById('city-name').value
        const zipCode = document.getElementById('zip-code').value

        if(location.length == '' && zipCode.length == ''){
            message('Error!', 'error', 'City OR Zipcode must not be empty!', 'Ok')
              return false
        }

        if(!isNaN(location) && location.length > 0 ){
            message('Error!', 'error', 'Number not allow in city name!', 'Ok')
              return false
        }

        if(isNaN(zipCode)){
            message('Error!', 'error', 'Zip Code Must Be Number!', 'Ok')
              return false
        }
        Swal.fire({
            title: 'Please Wait !',
            html: 'data uploading',// add html attribute if you want or remove
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
        });
        const getWeatherData = function(location, zipCode){
            const searchBy = function(location, zipCode){
                if(location){
                    return location
                } else{
                    return zipCode
                }
            }
            const search = searchBy(location, zipCode)
            const URL = `https://api.weatherapi.com/v1/current.json?key=c3771889ec3147a4957164249232006&q=${search}`

            axios.get(URL)
            .then(function (response) {
                swal.close();
                const locationDisplay = document.getElementById('location-name')
                const temperatureC = document.getElementById('temperature-c')
                const temperatureF = document.getElementById('temperature-f')
                const humidity = document.getElementById('humidity')
                const tempCondition = document.getElementById('temp-condition')
                const icon = document.getElementById('icon')
                const windSpeed = document.getElementById('wind-speed')
                if(response){
                    const weatherDisplay = document.getElementById('weather-display')
                    weatherDisplay.classList.remove("d-none")
                    weatherDisplay.classList.add("d-block")
                    locationDisplay.innerHTML = response.data.location.name
                    humidity.innerHTML = `Humidity: ${response.data.current.humidity}`
                    temperatureC.innerHTML = `${response.data.current.temp_c}°C`
                    temperatureF.innerHTML = `${response.data.current.temp_f}°F`
                    tempCondition.innerHTML = response.data.current.condition.text
                    icon.src = response.data.current.condition.icon
                    windSpeed.innerHTML = `${response.data.current.wind_kph} km/h`
                }
                console.log(response.data.location.name);
            })
            .catch(function (error) {
                swal.close();
                message('Error!', 'error', 'Nothing match with search text. Try Again!', 'Ok')
            });
        }
        getWeatherData(location, zipCode)
    })


const message = function(title, type, msg, cbt){
    Swal.fire({
        title: title,
        text: msg,
        icon: type,
        confirmButtonText: cbt
      })
}
