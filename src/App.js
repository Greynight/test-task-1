import './App.css';
import React, {useEffect, useRef, useState} from "react";

const TIME_ZONE_URL = 'http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json&zone=Europe/*';
const TIME_URL = 'http://api.timezonedb.com/v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=';

const App = () => {
  const [timeZonesList, setTimeZonesList] = useState([]);
  const [timeZone, setTimeZone] = useState('');
  const [time, setTime] = useState('');
  const intervalId = useRef(0);

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const updateTimeZones = async () => {
    const data = await getData(TIME_ZONE_URL) || {zones: []};
    setTimeZonesList(data.zones);

    // choose the first timezone by default
    setTimeZone(data.zones[0].zoneName);
  };

  const updateTime = async () => {
    const data = await getData(`${TIME_URL}${timeZone}`) || {formatted: []};
    setTime(data.formatted);
  };

  const updateTimeString = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    updateTime();

    intervalId.current = setInterval(updateTime, 5000);
  };

  useEffect(() => {
    updateTimeZones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeZone && !time) {
      updateTimeString();
    }
  }, [time, timeZone, updateTime, updateTimeString]);

  const handleChange = event => {
    setTimeZone(event.target.value);
    updateTimeString();
  };

  return (
    <div className="App">
      <header className="App-header">
        <label>
          Please choose timezone:
          <div>
            <select value={timeZone} onChange={handleChange}>
              {timeZonesList.map(({zoneName}) => <option key={zoneName} value={zoneName}>{zoneName}</option>)}
            </select>
          </div>
          <div>{time}</div>
        </label>
      </header>
    </div>
  );
}

export default App;
