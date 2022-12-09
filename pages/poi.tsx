import { useRouter } from "next/router";
import Poi from "../src/Component/Poi";

export default function poi() {
  const router = useRouter();
  return <Poi />;
}
