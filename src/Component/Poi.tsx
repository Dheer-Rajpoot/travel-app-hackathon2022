import { useEffect, useState } from "react";
import { useAppContext } from "../Context/appContext";
import { WayPoint } from "./MapRoute";
import clxs from 'clsx'
import { useRouter } from "next/router";

export interface PoiProps {}

const Poi = ({}: PoiProps) => {
  const router = useRouter();
  const { categories, coordinates, saveWaypoints, selectedPlaces, saveSelectedPlaces,  } = useAppContext();
  const { lat, lng } = coordinates;
  const radius = 9000;
  const subscriptionKey = "NAXWQD3Pyr9Rzxb4dto1J0iXICEhDlLykfgIk8w8sYw";
  const [interests, setInterests] = useState<{ category: string; interest: any; }[]>([])
  const [selected, setSelected] = useState(false)
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")

  const handleClick = (place: any) => {
    saveSelectedPlaces(place)
  }
  const setWaypoints = () => {
    const sortedWaypoints = []
    const waypoints = selectedPlaces
    const sourceWaypoint: any = selectedPlaces.filter((place: any) => place.id === source)
    const destinationWaypoint = selectedPlaces.filter((place: any) => place.id === destination)
    waypoints.splice(waypoints.indexOf(sourceWaypoint[0] as never), 1)
    waypoints.splice(waypoints.indexOf(destinationWaypoint[0]), 1)
    sortedWaypoints.push(sourceWaypoint[0])
    waypoints.sort((a:any, b: any) => {
      return Math.abs(sourceWaypoint[0].dist - b.dist)
    })
    sortedWaypoints.push(...waypoints)
    sortedWaypoints.push(destinationWaypoint[0])

    const cleaned = sortedWaypoints.map(wp => {
      return {
        lat: wp.position.lat,
        lng: wp.position.lon,
        title: wp.poi.name
      }
    })

    saveSelectedPlaces(cleaned)
    router.push('/bestroutes')
  }

  useEffect(() => {
    {
      categories.forEach((category: any) => {
        fetch(
          `https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=${category}&subscription-key=${subscriptionKey}&lat=${lat}&lon=${lng}&radius=${radius}`
        )
          .then((response) => response.json())
          .then((data) => {
            const shouldUpdate = !(interests.filter(i => i.category === category).length > 0)
            console.log(interests)
            if( shouldUpdate ) {
              setInterests(prevState => {
                return [...prevState, {
                  category,
                  interest: data
                }]
              })
            }
          });
      });
    }
  }, []);
  return (
    <>
      {
        !selected ?
        <>
          <h1 className="mb-10 text-center text-7xl mt-16">Points of Interest</h1>
          { interests?.map((interest, key) =>(
            <div className="ml-16">
                <h1 className="text-green-500 uppercase text-5xl mt-12 font-bold py-10">{ interest?.category }</h1>
                <div className="carousel rounded-box">
                  {
                    interest?.interest?.results?.map((place: any) => {
                      return <>
                          <div className="carousel-item h-[200px] mr-4">
                            <div
                              className="card shadow-xl bg-primary hover:bg-secondary text-white cursor-pointer w-[350px]"
                              onClick={() => handleClick(place)}
                            >
                              <div className="card-body">
                                <div className="card-title">{ place?.poi?.name }</div>
                              </div>
                            </div>
                          </div>
                      </>
                    })
                  }
                </div>
            </div>
          )) }
          <div className="flex justify-center pb-14">
            <button className="btn btn-secondary text-center mt-14" onClick={() => setSelected(true)}>Next</button>
          </div>
        </>
        : <>
          <h1 className="mb-10 text-center text-7xl text-white mt-16">Points of Interest</h1>
          <div className="flex w-full gap-16 justify-center items-center">
            <div>
              <h3 className="mb-4 text-center text-2xl text-grey-100">Select source</h3>
              {
                selectedPlaces?.map((place: any, key: number) => (
                  <div
                    className={clxs(source === place?.id ? "bg-accent text-black" : "bg-primary", "card shadow-xl hover:bg-secondary text-white cursor-pointer w-[350px] mt-4")}
                    key={key}
                    onClick={() => setSource(place?.id)}
                  >
                    <div className="card-body">
                      <div className="card-title">{ place?.poi?.name }</div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div>
              <h3 className="mb-4 text-center text-2xl text-grey-100">Select destination</h3>
              {
                selectedPlaces?.map((place: any, key: number) => (
                  <div
                    className={clxs(destination === place?.id ? "bg-accent text-black" : "bg-primary", "card shadow-xl hover:bg-secondary text-white cursor-pointer w-[350px] mt-4")}
                    key={key}
                    onClick={() => setDestination(place?.id)}
                  >
                    <div className="card-body">
                      <div className="card-title">{ place?.poi?.name }</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </>
      }
      <div className="flex justify-center pb-14">
        <button className="btn btn-secondary text-center mt-14" onClick={setWaypoints}>Get Routes</button>
      </div>
    </>
  );
};

export default Poi;
