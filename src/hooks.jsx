import { useState, useEffect } from 'react';
const { REACT_APP_RAPID_GEOIP_URL, REACT_APP_RAPID_DATA } = process.env;

/* 
 * useLocation()
 * Returns a rough lat/long based on the requestor's IP address.
 * REACT_APP_RAPID_GEOIP_URL should be an endpoint that returns this.
 * Example endpoint implementation https://github.com/rapid-eth/1md-loc
*/

export const useLocation = () => {
  const [viewport, setViewport] = useState()

  if (!REACT_APP_RAPID_GEOIP_URL) {
    throw new Error('REACT_APP_RAPID_GEOIP_URL environment variable not found. Please check your .env file.')
  }

  useEffect(() => {
    const fetchPos = async () => {
      await fetch(REACT_APP_RAPID_GEOIP_URL)
        .then(response => response.json())
        .then(data => {
          const { ll } = data;
          setViewport(() => { return { latitude: ll[0], longitude: ll[1], zoom: 6 } });
        });
    };
    fetchPos();

    // because REACT_APP_RAPID_GEOIP_URL will be constant suppress the linter
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  return viewport;
}

export const useEventsData = () => {
  const [data, setData] = useState()
  if (!REACT_APP_RAPID_DATA) {
    throw new Error('REACT_APP_RAPID_DATA environment variable not found. Please check your .env file.')
  }

  useEffect(() => {
    const fetchEvents = async () => {
      await fetch(REACT_APP_RAPID_DATA)
        .then(response => response.json())
        .then(data => {
          const filteredData = data.filter((event) => !!event.venue)
            .map(({ name, venue, link }) => {
              return { name, coordinates: [venue.lon, venue.lat], lat: venue.lat, lon: venue.lon, link }
            })
          setData(filteredData)
        });
    };
    fetchEvents();
    
    // because REACT_APP_RAPID_DATA will be constant suppress the linter   
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  return data
}