import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { WayPoint } from "../Component/MapRoute";

interface AppContextData {
  imageUrl: string;
  waypoints: WayPoint[];
  coordinates: {
    lat: number;
    lng: number;
  };
  categories: string[];
  selectedPlaces: [];
  saveSelectedPlaces: any;
  saveImage: (url: string) => void;
  saveWaypoints: (points: WayPoint[]) => void;
  saveCategory: (cats: string[]) => void;
  saveCoordinates: (pos: { lat: number; lng: number }) => void;
}
const AppContext = createContext<AppContextData>({
  imageUrl: "",
  waypoints: [],
  categories: [],
  coordinates: { lat: 0, lng: 0 },
  selectedPlaces: [],
  saveImage: () => {},
  saveWaypoints: () => {},
  saveCategory: () => {},
  saveCoordinates: () => {},
  saveSelectedPlaces: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export type AppContextProps = { children: ReactNode };

export default function ApplicationContext({ children }: AppContextProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<any>([]);
  const [waypoints, setWaypoints] = useState<WayPoint[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const saveImage = (url: string) => {
    setImageUrl(url);
  };

  const saveCategory = (cats: string[]) => {
    console.log("context saveCategory", cats);
    setCategories([...cats]);
  };

  const saveWaypoints = (points: WayPoint[]) => {
    console.log("context saveWaypoints", points);
    setWaypoints([...points]);
  };

  const saveCoordinates = (pos: { lat: number; lng: number }) => {
    console.log("context saveCoordinates", pos);
    setCoordinates(pos);
  };

  const saveSelectedPlaces = (places: []) => {
    console.log("context saveSelectedPlaces", places);
    setSelectedPlaces((prevState: any) => [...prevState, places]);
  };

  return (
    <AppContext.Provider
      value={{
        imageUrl,
        categories,
        coordinates,
        waypoints,
        selectedPlaces,
        saveCategory,
        saveWaypoints,
        saveCoordinates,
        saveImage,
        saveSelectedPlaces,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// const AppContextProvider: React.FC<React.ReactNode> = ({ children }) => {
//   const [categories, setCategories] = React.useState<string[]>([]);

//   const saveCategory = (cat: string) => {
//     setCategories([...categories, cat]);
//   };

//   return (
//     <AppContext.Provider value={{ categories, saveCategory }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// const appConsumer = AppContext.Consumer;

// export { appConsumer, AppContext };

// export default AppContextProvider;
