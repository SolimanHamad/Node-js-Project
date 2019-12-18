/* API */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "b1463d41e262a1c6425c40aca6f549cb";

/* Definitions */
const zip = document.getElementById("zip");
const buton = document.getElementById("my-button");
const res = document.getElementById("result");

/* Get & Post defined */
const getData = async (url, zip, api) => {
  const data = await fetch(url + `${zip}&units=metric&APPID=` + api); // TODO: what is metric, where is it defined? 
  const response = await data.json();
  return response;
};
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },// body data type must match "Content-Type" header
    body: JSON.stringify(data) 
  });
  return await response;
};

/* listenner to button click */
buton.addEventListener("click", () => {
  let zipValue = zip.value;
  // if zip has no value, return default value. (instead of try, catch) 
  if (!zipValue) {
    zipValue = 31433;
  }
  getData(baseURL, zipValue, apiKey).then(result => {
    console.log(result);
    res.textContent = `${result.name} is ${result.main.temp} C`;
    postData("http://localhost:7000/app", {
      name: result.name,
      temperature: result.main.temp
    });
  });
});
