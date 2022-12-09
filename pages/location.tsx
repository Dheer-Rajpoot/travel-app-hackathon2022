import { useRouter } from 'next/router'
import { LocationDetected } from '../src/Component/LocationDetected'

    export default function location() {
        const router = useRouter();
        return (
        <LocationDetected landMark={router.query.landmark as string} />
        )
      }





