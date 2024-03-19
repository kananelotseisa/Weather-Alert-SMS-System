// Add event listener for the weather button
document.getElementById('weatherButton').addEventListener('click', function() {
    // Load the weather forecast monitoring page dynamically
    window.location.href = 'weather_6_Days_Forecast.html';
});

// Add event listener for the SMS button (if needed)
document.getElementById('smsButton').addEventListener('click', function() {
    // Load the SMS reports page dynamically
    // window.location.href = 'smsReports.html';
    console.log('SMS button clicked');
});

document.getElementById('criticalWeatherAlert').addEventListener('click', function() {
    // Load the SMS reports page dynamically
     window.location.href = 'critical_Weather_Alert.html';
});
