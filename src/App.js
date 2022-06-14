import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('')
  const [backgroundurl, setBackgroundurl] = useState('https://cdn.create.vista.com/api/media/medium/243396112/stock-photo-landscape-carpathian-mountains-covered-snow?token=')
  const [style, setStyle] =useState('rgb(255, 255, 255)')
  const [error, setError] = useState('')
  const [lenguage, setLenguage] = useState('es')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8cea7bef3aaa8af40db90df1267081a0&lang=${lenguage}`;

  const  searchLocation = (event) =>{
       if(event.key === 'Enter'){
          axios.get(url).then((response)=>{
          setData(response.data);
          console.log(response.data);
          setError('');
          setBackground(response.data);
      })
      .catch(error => {
        setError(lenguage === 'es' ? 'No se encontro la ciudad' : 'City not found')
        setData({})
        setBackgroundurl('https://cdn.create.vista.com/api/media/medium/243396112/stock-photo-landscape-carpathian-mountains-covered-snow?token=')
      })
      setLocation('')
    } 
    }

      function setBackground(data) {
        const sunset = new Date(data.sys.sunset * 1000).getHours();
        const sunrise = new Date(data.sys.sunrise * 1000).getHours();
        const currentTime = new Date().getHours().toLocaleString();
        console.log(currentTime)
        if(data.weather[0].main === "Clear"){
          setStyle('rgb(255, 255, 255)')
          if(currentTime >= sunset || currentTime <= sunrise){
            setBackgroundurl('./imagenes/clearNight.jpg')
          } else {
            setBackgroundurl('./imagenes/clearDay.jpg')
          }
          } else if(data.weather[0].main === "Thunderstorm"){
            setStyle('rgb(255, 255, 255)')
          if(currentTime >= sunset || currentTime <= sunrise){
            setBackgroundurl('./imagenes/thunderstormNight.jpg')
          } else {
            setBackgroundurl('./imagenes/thunderstormDay.jpg')
          }
        } else if (data.weather[0].main === "Drizzle"){
          setStyle('rgb(255, 255, 255)')
          if(currentTime >= sunset || currentTime <= sunrise){
            setBackgroundurl('./imagenes/drizzleNight.jpg')
          } else {
            setBackgroundurl('./imagenes/drizzleDay.jpg')
          }         
        } else if (data.weather[0].main === "Rain"){
          setStyle('rgb(255, 255, 255)')

          if(currentTime >= sunset || currentTime <= sunrise){
            setBackgroundurl('./imagenes/rainNight.jpg')
          } else {
            setBackgroundurl('./imagenes/rainDay.jpg')
          }  
        }
         else if(data.weather[0].main === "Snow"){
           setStyle('rgb(255, 255, 0)')

           if(currentTime >= sunset || currentTime <= sunrise){
            setBackgroundurl('./imagenes/snowNight.jpg')
          } else {
            setBackgroundurl('./imagenes/snowDay.jpg')
          }
        } else if(data.weather[0].main === "Clouds"){
          setStyle('rgb(255, 255, 255)')

          if(currentTime >= sunset || currentTime <= sunrise){
            setBackgroundurl('./imagenes/cloudsNight.jpg')
          } else {
            setBackgroundurl('./imagenes/cloudsDay.jpg')
          }          
        }
    }

    const changeLenguage = () =>{
      if(lenguage === 'es'){
        setLenguage('en')
      } else {
        setLenguage('es')
      }
    }

  return (
    <div className="app" style={{
      backgroundImage: `url(${backgroundurl})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      color: `${style}`
     }}>
        <button className='boton' onClick={()=>{changeLenguage()}}>{lenguage === 'es' ? 'English' : 'Español'}</button>
      <div className="search">
        <input value={location} autoFocus placeholder={lenguage === 'es' ? 'Ingrese una ciudad' : 'Enter a location'} onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation} type="text" />
      </div>
        <div className="error">{error}</div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
              {data.main ? <h1> {data.main.temp.toFixed()}°</h1> : ""}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : ""}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'> {data.main.feels_like.toFixed()}° </p> : ""}
            <p> {lenguage === 'es' ? 'Sensacion' : 'Feels like'} </p>
          </div>
          <div className="humidity">
           {data.main ?  <p className='bold'>{data.main.humidity}%</p> : ""}
            <p> {lenguage === 'es' ? 'Humedad' : 'Humidity'} </p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed}KMh</p> : ""}
            <p> {lenguage === 'es' ? 'Viento' : 'Wind'} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
