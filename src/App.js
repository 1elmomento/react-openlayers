import { useRef, useState, useEffect } from "react";

import "ol/ol.css";
import "./App.css";

import Feature from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { Style, Circle, Fill, Stroke } from "ol/style";

function App() {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  useEffect(() => {
    // Defining a point which matches our coordinates
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([2.334957, 48.85893])),
    });

    // Styling point (A red circle with radius of 7 pixels and black stroke of 1 pixel)
    const pointStyle = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({ color: "red" }),
        stroke: new Stroke({
          color: "black",
          width: 1,
        }),
      }),
    });

    iconFeature.setStyle(pointStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([2.334957, 48.85893]),
        zoom: 13,
      }),
    });
    setMap(map);
  }, []);

  return (
    <div className="container">
      <h1>Simple Openlayers example</h1>
      <h2>Centerd on a certain coordinates with Marker</h2>
      <div className="map-container" ref={mapElement} />
    </div>
  );
}

export default App;
