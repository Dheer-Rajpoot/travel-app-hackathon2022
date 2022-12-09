import { useRouter } from "next/router";
import MapRoute from "../src/Component/MapRoute";
import { useContext } from "react";
import { useAppContext } from "../src/Context/appContext";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicMapRoute = dynamic(() => import("../src/Component/MapRoute"), {
  ssr: false,
});

export default function poi() {
  const router = useRouter();
  const { waypoints } = useAppContext();
  // return <DynamicMapRoute waypoints={waypoints} />;
  return <MapRoute waypoints={waypoints} />;
}
