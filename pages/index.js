import SplashScreen from "../components/SplashScreen";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


export default function Home() {

    return (
        <LoadScript googleMapsApiKey=       {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
  <GoogleMap
    mapContainerStyle={{ width: '100%', height: '400px' }}
    zoom={10} // Adjust the zoom level as needed
  >
  </GoogleMap>
</LoadScript>

    );
}