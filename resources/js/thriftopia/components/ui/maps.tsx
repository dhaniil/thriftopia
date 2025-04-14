import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -7.797068,
  lng: 110.370529
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyChupa2krf_0L_tJd9uofxuALRRhLVQhcs">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
