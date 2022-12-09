import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

interface AppContextData {
  coordinates: {
    lat: number;
    lng: number;
  };
  categories: string[];
  selectedPlaces: []
  saveCategory: (cats: string[]) => void;
  saveCoordinates: (pos: { lat: number; lng: number }) => void;
  saveSelectedPlaces: any
}
const AppContext = createContext<AppContextData>({
  categories: [],
  coordinates: { lat: 0, lng: 0 },
  selectedPlaces: [],
  saveCategory: () => {},
  saveCoordinates: () => {},
  saveSelectedPlaces: () => {}
});

export function useAppContext() {
  return useContext(AppContext);
}

export type AppContextProps = { children: ReactNode };

export default function ApplicationContext({ children }: AppContextProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<any>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const saveCategory = (cats: string[]) => {
    console.log("context saveCategory", cats);
    setCategories([...cats]);
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
      value={{ categories, coordinates, saveCategory, saveCoordinates, selectedPlaces, saveSelectedPlaces }}
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
