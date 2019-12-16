import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import Typography from '@material-ui/core/Typography';
import Card from './Card';
import { useLocation, useEventsData } from './hooks';
import ErrorBoundary from './ErrorBoundary';
import { getRandomSubarray } from './utils';

import 'mapbox-gl/src/css/mapbox-gl.css';

const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env

const App = () => {
  const viewport = useLocation();
  const eventsData = useEventsData();
  const [hover, setHover] = useState()

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: eventsData,
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
    }
  });

  const renderTooltip = () => {
    const { hoveredObject, pointerX, pointerY } = hover || {};
    return hoveredObject && (
      <div className={'hover'} style={{ left: pointerX, top: pointerY }}>
        <h5>{hoveredObject.name}</h5>
        <h6><a href={hoveredObject.link}>{hoveredObject.link}</a></h6>
        <p dangerouslySetInnerHTML={{__html: hoveredObject.description}} />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="parent">
        <div className="leftChild">
          <Typography variant="h6" style={{textAlign: 'center'}}>Upcoming Events Near You</Typography>
          
          {
            eventsData && getRandomSubarray(eventsData, 4).map((item, index) => 
              <Card key={index} name={item.name} link={item.link} />
              // <div key={index}>
              //   <h4>{item.name}</h4>
              //   <a target="_new" href={item.link}>more info</a>
              // </div>
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
              <StaticMap mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN} reuseMaps preventStyleDiffing />
              {renderTooltip()}
            </DeckGL>
        )}
        </div>

      </div>
    </ErrorBoundary>
  );
};

export default App