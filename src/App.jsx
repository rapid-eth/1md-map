import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

import data from './data.json';
import ErrorBoundary from './ErrorBoundary';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGV2bWFwYm94dXNlciIsImEiOiJjazNzdmt2OHIwYWZtM2NvNHh5ZWdreXEwIn0.XFw5zIZigXjqS5JuAJ2YWA';
// const GEOIP_URL = 'https://json.geoiplookup.io/'; // free but hit a rate limit
// const IPDATA_URL = 'https://api.ipdata.co?api-key=3ee8cf01bcffcd4142324c995f648e91857b8405a4a90f0a2715bb61'; // free but hit a rate limit
const RAPID_GEOIP_URL = 'https://us-central1-geoip-f708b.cloudfunctions.net/loc';

const locationData = Object.values(data.events).filter((event) => !!event.venue)
  .map(({ name, venue, link }) => {
    return { name, coordinates: [venue.lon, venue.lat], lat: venue.lat, lon: venue.lon, link }
  })
console.log('locationData', locationData)

const getRandomSubarray = (arr, size) => {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

const App = () => {
  const [viewport, setViewport] = useState()
  const [hover, setHover] = useState({ hoveredObject: undefined, pointerX: undefined, pointerY: undefined })

  useEffect(() => {
    const fetchPos = async () => {
      await fetch(RAPID_GEOIP_URL)
        .then(response => response.json())
        .then(data => {
          const { ll } = data;
          setViewport(() => { return { latitude: ll[0], longitude: ll[1], zoom: 6 } });
        });
    };
    fetchPos();
  }, []);

  const renderTooltip = () => {
    const { hoveredObject, pointerX, pointerY } = hover || {};
    return hoveredObject && (
      <div style={{ position: 'absolute', zIndex: 100, pointerEvents: 'none', background: 'rgba(0,0,0,.6)', padding: '1rem', borderRadius: '1rem', left: pointerX, top: pointerY }}>
        <h4>{hoveredObject.name}</h4>
        <p>{hoveredObject.link}</p>
      </div>
    );
  }

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: locationData,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 5,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => d.coordinates,
    getRadius: d => Math.sqrt(d.exits),
    getFillColor: d => [255, 140, 0],
    getLineColor: d => [0, 0, 0],
    onHover: ({ object, x, y }) => {
      if (object) {
        setHover({
          hoveredObject: object,
          pointerX: x,
          pointerY: y
        })
      } else {
        setHover({
          hoveredObject: undefined,
          pointerX: undefined,
          pointerY: undefined
        })
      }
      // const tooltip = `${object.name}\n${object.address}`;
      /* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
    }
  });


  return (
    <ErrorBoundary>
      <div className="parent">
        <div className="leftChild">
          {
            getRandomSubarray(locationData, 4).map((item, index) => 
              <div key={index}>
                <h4>{item.name}</h4>
                <a href={item.link}>more info</a>
              </div>
            )
          }
        </div>
        <div className="rightChild">
          {viewport && (
            <DeckGL
              initialViewState={viewport}
              controller={true}
              layers={[layer]}
            >
              <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} reuseMaps preventStyleDiffing />
              {renderTooltip()}
              {/* <ScatterplotLayer id="scatterplot-layer" data={data} /> */}
            </DeckGL>
          )}
        </div>

      </div>
    </ErrorBoundary>
  );
};

export default App