import React, { useState } from "react";
import Script from "next/script";
import { Helmet } from "react-helmet";
import { useAppContext } from "../Context/appContext";

export interface MapRouteProps {
  waypoints: WayPoint[];
}

export interface WayPoint {
  lat: number;
  lng: number;
  title: string;
}

const MapRoute = ({ waypoints }: MapRouteProps) => {
  const { selectedPlaces } = useAppContext();
  console.log("maproute waypoints", selectedPlaces[selectedPlaces.length - 1]);

  //   let waypoints_mock: WayPoint[] = [
  //     { lng: 77.2177, lat: 28.6304, title: "1-CP" },
  //     { lng: 77.0721, lat: 28.3976, title: "2-WorldMark" },
  //     { lng: 77.3211, lat: 28.5673, title: "3-DLF Mall Noida" },
  //     { lng: 77.0958, lat: 28.5058, title: "4-Ambience" },
  //   ];

  let waypoints_mock = selectedPlaces[selectedPlaces.length - 1]; //only the last element is as per expected mock object !! ???

  const getMapFunction = `var map, datasource, client;

  function GetMap() {
      //Instantiate a map object
      var map = new atlas.Map('myMap', {
          // Replace <Your Azure Maps Key> with your Azure Maps primary subscription key. https://aka.ms/am-primaryKey
          authOptions: {
              authType: 'subscriptionKey',
              subscriptionKey: 'NAXWQD3Pyr9Rzxb4dto1J0iXICEhDlLykfgIk8w8sYw'
          }
      });
  
      //Wait until the map resources are ready.
      map.events.add('ready', function () {
  
          // Optional - Render real-time traffic data on a map
  
          map.setTraffic({
              //speed of the road relative to free-flow
              flow: "relative" // flow?: "none" | "relative" | "absolute" | "relative-delay"
          });
  
          // -------------------------Define route display rendering------------------------
  
          //Create a data source and add it to the map.
          datasource = new atlas.source.DataSource();
          map.sources.add(datasource);
  
          //Add a layer for rendering the route lines and have it render under the map labels.
          map.layers.add(new atlas.layer.LineLayer(datasource, null, {
              strokeColor: '#2272B9',
              strokeWidth: 5,
              lineJoin: 'round',
              lineCap: 'round'
          }), 'labels');
  
          //Add a layer for rendering point data.
          map.layers.add(new atlas.layer.SymbolLayer(datasource, null, {
              iconOptions: {
                  image: ['get', 'icon'],
                  allowOverlap: true
              },
              textOptions: {
                  textField: ['get', 'title'],
                  offset: [0, 1.2]
              },
              filter: ['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'MultiPoint']] //Only render Point or MultiPoints in this layer.
          }));
  
          //Create the GeoJSON objects which represent the start and end points of the route.
  
  
          var waypoint_list = ${JSON.stringify(
            waypoints_mock
          )}.map((waypoint, index, waypoints) => {
              return (new atlas.data.Feature(new atlas.data.Point([waypoint.lng, waypoint.lat]), {
                  title: waypoint.title,
                  icon: (index === 0 || index === waypoints.length - 1) ? "pin-red" : "pin-round-blue"
  
              }));
          })
  
          //Add the data to the data source.
          datasource.add(waypoint_list);
  
          //sets the camera view using the latitude and longitude of the start and end points
          map.setCamera({
              bounds: atlas.data.BoundingBox.fromData([waypoint_list[0], waypoint_list[waypoint_list.length - 1]]),
              padding: 80
          });
  
          // -----------------------Get route directions----------------------
  
          //Use MapControlCredential to share authentication between a map control and the service module.
          var pipeline = atlas.service.MapsURL.newPipeline(new atlas.service.MapControlCredential(map));
  
          //Construct the RouteURL object
          var routeURL = new atlas.service.RouteURL(pipeline);
  
          //Start and end point input to the routeURL
          var coordinates = [waypoint_list.map((point) => {
              return (
                  [point.geometry.coordinates[0], point.geometry.coordinates[1]]
              )
          })
          ];
  
          // TRAVEL OPTIONS
          var 
             mode_options = {
                travelMode: 'car'
              }

          //Make a search route request
          routeURL.calculateRouteDirections(atlas.service.Aborter.timeout(10000), coordinates[0], mode_options).then((directions) => {
              //Get data features from response
              var data = directions.geojson.getFeatures();
              //Get the route line and add some style properties to it.  
              var routeLine = data.features[0];
              //Add the route line to the data source. This will add the car route after the truck route.  
              datasource.add(data);
          });
  
      });
  
  }
  
  `;
  return (
    <div className="w-full h-full">
      <Script>{getMapFunction}</Script>

      <Script>
        {`
            document.body.onload = function()
            {
                GetMap();
            }();

         
         `}
      </Script>

      <div className="w-full h-full" id="myMap"></div>

      <div className="absolute top-4 left-4 rounded-xl bg-white w-[300px] text-black border-2 p-4">
        Shows a route between an origin and a destination, passing through
        waypoints if they are specified. The route will take into account
        factors such as current traffic and the typical road speeds on the
        requested day of the week and time of day.
      </div>
    </div>
  );
};
export default MapRoute;
