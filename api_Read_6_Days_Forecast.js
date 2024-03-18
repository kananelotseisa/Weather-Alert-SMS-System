// Define the API link
const apiUrl = 'https://api.tomorrow.io/v4/timelines?location=29.6100,%2028.2336&fields=weatherCodeFullDay&timesteps=1d&units=imperial&apikey=xAwcv7910PENIDTLrJ0rgbz4MdqzZ3Ic';

// Mapping between weather codes and descriptions
const weatherDescriptions = {
  "0": "Unknown",
  "1000": "Clear, Sunny",
  "1100": "Mostly Clear",
  "1101": "Partly Cloudy",
  "1102": "Mostly Cloudy",
  "1001": "Cloudy",
  "1103": "Partly Cloudy and Mostly Clear",
  "2100": "Light Fog",
  "2101": "Mostly Clear and Light Fog",
  "2102": "Partly Cloudy and Light Fog",
      "2103": "Mostly Cloudy and Light Fog",
      "2106": "Mostly Clear and Fog",
      "2107": "Partly Cloudy and Fog",
      "2108": "Mostly Cloudy and Fog",
      "2000": "Fog",
      "4204": "Partly Cloudy and Drizzle",
      "4203": "Mostly Clear and Drizzle",
      "4205": "Mostly Cloudy and Drizzle",
      "4000": "Drizzle",
      "4200": "Light Rain",
      "4213": "Mostly Clear and Light Rain",
      "4214": "Partly Cloudy and Light Rain",
      "4215": "Mostly Cloudy and Light Rain",
      "4209": "Mostly Clear and Rain",
      "4208": "Partly Cloudy and Rain",
      "4210": "Mostly Cloudy and Rain",
      "4001": "Rain",
      "4211": "Mostly Clear and Heavy Rain",
      "4202": "Partly Cloudy and Heavy Rain",
      "4212": "Mostly Cloudy and Heavy Rain",
      "4201": "Heavy Rain",
      "5115": "Mostly Clear and Flurries",
      "5116": "Partly Cloudy and Flurries",
      "5117": "Mostly Cloudy and Flurries",
      "5001": "Flurries",
      "5100": "Light Snow",
      "5102": "Mostly Clear and Light Snow",
      "5103": "Partly Cloudy and Light Snow",
      "5104": "Mostly Cloudy and Light Snow",
      "5122": "Drizzle and Light Snow",
      "5105": "Mostly Clear and Snow",
      "5106": "Partly Cloudy and Snow",
      "5107": "Mostly Cloudy and Snow",
      "5000": "Snow",
      "5101": "Heavy Snow",
      "5119": "Mostly Clear and Heavy Snow",
      "5120": "Partly Cloudy and Heavy Snow",
      "5121": "Mostly Cloudy and Heavy Snow",
      "5110": "Drizzle and Snow",
      "5108": "Rain and Snow",
      "5114": "Snow and Freezing Rain",
      "5112": "Snow and Ice Pellets",
      "6000": "Freezing Drizzle",
      "6003": "Mostly Clear and Freezing drizzle",
      "6002": "Partly Cloudy and Freezing drizzle",
      "6004": "Mostly Cloudy and Freezing drizzle",
      "6204": "Drizzle and Freezing Drizzle",
      "6206": "Light Rain and Freezing Drizzle",
      "6205": "Mostly Clear and Light Freezing Rain",
      "6203": "Partly Cloudy and Light Freezing Rain",
      "6209": "Mostly Cloudy and Light Freezing Rain",
      "6200": "Light Freezing Rain",
      "6213": "Mostly Clear and Freezing Rain",
      "6214": "Partly Cloudy and Freezing Rain",
      "6215": "Mostly Cloudy and Freezing Rain",
      "6001": "Freezing Rain",
      "6212": "Drizzle and Freezing Rain",
      "6220": "Light Rain and Freezing Rain",
      "6222": "Rain and Freezing Rain",
      "6207": "Mostly Clear and Heavy Freezing Rain",
      "6202": "Partly Cloudy and Heavy Freezing Rain",
      "6208": "Mostly Cloudy and Heavy Freezing Rain",
      "6201": "Heavy Freezing Rain",
      "7110": "Mostly Clear and Light Ice Pellets",
      "7111": "Partly Cloudy and Light Ice Pellets",
      "7112": "Mostly Cloudy and Light Ice Pellets",
      "7102": "Light Ice Pellets",
      "7108": "Mostly Clear and Ice Pellets",
      "7107": "Partly Cloudy and Ice Pellets",
      "7109": "Mostly Cloudy and Ice Pellets",
      "7000": "Ice Pellets",
      "7105": "Drizzle and Ice Pellets",
      "7106": "Freezing Rain and Ice Pellets",
      "7115": "Light Rain and Ice Pellets",
      "7117": "Rain and Ice Pellets",
      "7103": "Freezing Rain and Heavy Ice Pellets",
      "7113": "Mostly Clear and Heavy Ice Pellets",
      "7114": "Partly Cloudy and Heavy Ice Pellets",
      "7116": "Mostly Cloudy and Heavy Ice Pellets",
      "7101": "Heavy Ice Pellets",
      "8001": "Mostly Clear and Thunderstorm",
      "8003": "Partly Cloudy and Thunderstorm",
      "8002": "Mostly Cloudy and Thunderstorm",
  "8000": "Thunderstorm"
};


// Fetch the JSON data from the API
fetch(apiUrl)
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON data
        return response.json();
    })
    .then(data => {
        // Once JSON data is fetched and parsed, you can work with it here
        console.log('JSON Data:', data);

        // Replace weather codes with descriptions
        const timelines = data.data.timelines;
        timelines.forEach(timeline => {
            console.log('Timestep:', timeline.timestep);
            console.log('Start Time:', timeline.startTime);
            console.log('End Time:', timeline.endTime);
            console.log('Intervals:');
            const weatherForecast = [];
            timeline.intervals.forEach(interval => {
                console.log('  - Start Time:', interval.startTime);
                const weatherCode = interval.values.weatherCodeFullDay;
                const weatherDescription = weatherDescriptions[weatherCode] || 'Unknown';
                console.log('  - Weather Description:', weatherDescription);
                weatherForecast.push({
                    startTime: interval.startTime,
                    weatherDescription: weatherDescription
                });
            });
            // Display weather forecast on the HTML page
            displayWeatherForecast(timeline.timestep, timeline.startTime, timeline.endTime, weatherForecast);
        });
    })
    .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('Fetch Error:', error);
    });

// Function to display weather forecast on the HTML page
function displayWeatherForecast(timestep, startTime, endTime, forecast) {
    const weatherDiv = document.getElementById('weather');
    const timeDiv = document.getElementById('time');

    weatherDiv.innerHTML = `<strong>Timestep:</strong> ${timestep}<br>
    <strong>Start Time:</strong> ${startTime}<br>
    <strong>End Time:</strong> ${endTime}<br>
    <strong>Intervals:</strong><br>`;
    
    forecast.forEach(interval => {
        weatherDiv.innerHTML += `- <strong>Start Time:</strong> ${interval.startTime}<br>
        - <strong>Weather Description:</strong> ${interval.weatherDescription}<br>`;
    });

    timeDiv.innerHTML = ''; // Clear the time div since it's not needed
}
   