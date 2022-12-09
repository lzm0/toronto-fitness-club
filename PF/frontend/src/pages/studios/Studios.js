import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudioList from "./StudioList";
import StudioMap from "./StudioMap";
import StudioSearch from "./StudioSearch";

function Studios() {
  const navigate = useNavigate();

  const [studios, setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setMyPosition({ lat, lng });
      setCenter({ lat, lng });
      setSearchParams({
        ...searchParams,
        latitude: lat,
        longitude: lng,
      });
    });
  }, []);

  const centerStudio = (studio) => {
    setCenter({ lat: studio.latitude, lng: studio.longitude });
    setZoom(15);
  };

  useEffect(() => {
    fetch(
      `http://${window.location.hostname}:8000/api/studios/${
        Object.keys(searchParams).length > 0 ? "?" : ""
      }${Object.keys(searchParams)
        .map((key) => `${key}=${searchParams[key]}`)
        .join("&")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setStudios(data.results);
      });
  }, [searchParams]);

  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col gap-4 grow justify-items-stretch max-w-xl min-w-0">
        <StudioSearch setSearchParams={setSearchParams} />
        <div className="card bg-base-100 overflow-scroll max-h-96">
          <StudioList
            studios={studios}
            selectedStudio={selectedStudio}
            setSelectedStudio={(studio) => {
              setSelectedStudio(studio);
              centerStudio(studio);
            }}
            myPosition={myPosition}
          />
        </div>
        <div className="card bg-base-100 overflow-hidden h-96">
          <StudioMap
            studios={studios}
            setSelectedStudio={(studio) => {
              setSelectedStudio(studio);
              centerStudio(studio);
            }}
            center={center}
            zoom={zoom}
            myPosition={myPosition}
          />
        </div>
      </div>
    </div>
  );
}

export default Studios;
