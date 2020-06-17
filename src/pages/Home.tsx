import React, { useState } from 'react';
import { IonContent, IonPage, IonFooter} from '@ionic/react';
import './Home.css';

const api = {
  key: "fee4be8a8db8e91a9648903da6233e98",
  base: "https://api.openweathermap.org/data/2.5"
};


const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<any>({});

  const handleSearch = (evt: any) =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        //console.log(result);
        setWeather(result);
        setQuery("");
    })
    .catch(err => console.log(err));
    }
  }

  const dateBuilder = (d: Date) => {
    let months = ["January", "Febuary", "March", "April", "May", "June", "Jully", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

  }


  return (
    <IonPage>

    <IonContent>

   <div className={
     (typeof weather.main != "undefined") ? 
     ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'
   }>
      <main>
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleSearch}
          value={query}
          />
        </div>

      {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      ) : ("")}
 
      </main>

    </div> 
    
    </IonContent>
    <IonFooter>
    <div className="author">
        @T-Blaise
      </div>
    </IonFooter>
    </IonPage>
  );
};

export default Home;
