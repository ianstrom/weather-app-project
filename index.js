window.addEventListener('load', ()=> {
    let long0;
    let lat0;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let hourlySection = document.querySelector(".hourly-section")

    

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position =>{
                long0 = position.coords.longitude;
                lat0 = position.coords.latitude;
    
                const api = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat0}&lon=${long0}&exclude=minutely,alerts&units=imperial&appid=ef40e215f47f8d8759f726884d19dc94`;
    
                fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(data => {
                   { console.log(data);
                    const {temp} = data.current
                    temperatureDegree.textContent = Math.round(temp);
                   }
    
                    for (let i = 0; i < data.hourly.length; i++) {
                        const {temp, pop} = data.hourly[i]
                        const {description, icon, id} = data.hourly[i].weather[0]
                        
                        
                        const hourlyWeather = document.createElement('div')
                        hourlyWeather.className = 'hourly-weather'
                        hourlySection.appendChild(hourlyWeather)
                        
                        const hourlyTemp = document.createElement('div')
                        hourlyTemp.className = 'hourly-temp'
                        hourlyTemp.textContent = Math.round(temp) + '°F'
                        hourlyWeather.appendChild(hourlyTemp)
    
                        const hourlyIcon = document.createElement('img')
                        hourlyIcon.className= 'hourly-icon'
                        hourlyIcon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
                        hourlyWeather.appendChild(hourlyIcon)

                        const hourlyPop = document.createElement('div')
                        hourlyPop.className = 'hourly-pop'
                        hourlyPop.textContent = Math.round(pop * 100) + '%'
                        hourlyWeather.appendChild(hourlyPop)
    
                        function formatAMPM(date) {
                            const currentHour = new Date().getHours();
                            let hour = (currentHour + i) % 24;
                            if (hour === 0) {
                                hour = 12;
                            }
                            let ampm = 'am';
                            if (hour > 11) {
                                ampm = 'pm';
                                if (hour > 12) {
                                hour -= 12;
                                }
                            }
                            return `${hour}${ampm}`;
                        };
    
                        const hour = document.createElement('div')
                        hour.className = 'hour'
                        hour.textContent = formatAMPM(new Date);
                        hourlyWeather.appendChild(hour)
                    }
                })
            });
        }
});