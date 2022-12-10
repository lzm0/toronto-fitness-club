import { MapPinIcon } from "@heroicons/react/24/solid";
import GoogleMapReact from "google-map-react";

function Marker({ onClick }) {
  return (
    <MapPinIcon
      onClick={onClick}
      className="w-8 h-8 text-primary -translate-x-1/2 -translate-y-1/2"
    />
  );
}

function MeMarker({ onClick }) {
  return (
    <MapPinIcon
      onClick={onClick}
      className="w-10 h-10 text-secondary -translate-x-1/2 -translate-y-1/2"
    />
  );
}

function StudioMap({ studios, setSelectedStudio, center, zoom, myPosition }) {
  return (
    <GoogleMapReact bootstrapURLKeys={{ key: "" }} center={center} zoom={zoom}>
      {studios.map((studio) => (
        <Marker
          key={studio.id}
          lat={studio.latitude}
          lng={studio.longitude}
          onClick={() => {
            setSelectedStudio(studio);
          }}
        ></Marker>
      ))}
      {myPosition && (
        <MeMarker lat={myPosition.lat} lng={myPosition.lng}></MeMarker>
      )}
    </GoogleMapReact>
  );
}

export default StudioMap;
