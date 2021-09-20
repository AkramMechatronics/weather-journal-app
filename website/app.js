/* Global Variables */
const wetherAPIurl = "https://api.openweathermap.org/data/2.5/weather?zip=";//{zip code},{country code}{API key}
// Personal API Key for OpenWeatherMap API
const weatherAPIkey = "";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateButton);

/* Function called by event listener */
function generateButton(e){
	const userEneteredZip = document.getElementById("zip").value;
	if(!userEneteredZip){
		alert("no zip value is entered");
	}
	const userEneteredFeel = document.getElementById("feelings").value;
	if(!userEneteredFeel){
		alert("enter your feelings about the weather");
	}
	getTemp(userEneteredZip).then((tempResult) =>{
													postWeatherData('/addWeather', {temp: tempResult, date: newDate, feel: userEneteredFeel});
													}).then(updateUIpage());
}

/* Function to GET Web API Data*/
const getTemp = async(zipValue) =>{
	const res = await fetch(wetherAPIurl+zipValue+"&appid="+weatherAPIkey+"&units=metric");
	try {
		const data = await res.json();
		return data.main.temp;
	}
	catch(error) {
		console.log("error", error);
		alert("error getting data from openweather");
	}
}

/* Function to post weather data */
const postWeatherData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
		console.log("error", error);
		alert("error posting data to the server");
    }
}

/* Function to get from the server the weather data then update UI*/
const updateUIpage = async () => {
  const request = await fetch('/weather');
  try{
    const weatherData = await request.json();
    document.getElementById("date").innerHTML = "Today,s date is "+ weatherData.date;
	document.getElementById("temp").innerHTML = "Today,s Temperature is "+weatherData.temp+" °C";
    document.getElementById("content").innerHTML = "weather feeling is "+weatherData.feel;
  }
  catch(error){
    console.log("error", error);
	alert("error updating UI");
  }
}