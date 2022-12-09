import { useRouter } from "next/router";
import BestRoute from "../src/Component/BestRoute";

export default function poi() {
  const router = useRouter();
  return <BestRoute />;
}
