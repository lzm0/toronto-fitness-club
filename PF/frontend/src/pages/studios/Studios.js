import { useCallback, useEffect, useState } from "react";

import StudioList from "./StudioList";
import StudioMap from "./StudioMap";
import StudioSearch from "./StudioSearch";

function Studios() {
  const [studios, setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMyPosition({ lat, lng });
        setCenter({ lat, lng });
        setSearchParams((searchParams) => ({
          ...searchParams,
          lat: lat,
          lon: lng,
        }));
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: Infinity,
      }
    );
  }, []);

  const centerStudio = (studio) => {
    setCenter({ lat: studio.latitude, lng: studio.longitude });
    setZoom(15);
  };

  const fetchPage = useCallback(
    (page) => {
      fetch(
        `http://${window.location.hostname}:8000/api/studios/?page=${page}${
          Object.keys(searchParams).length > 0
            ? `&${new URLSearchParams(searchParams)}`
            : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (page === 1) {
            setStudios(data.results);
          } else {
            setStudios((studios) => [...studios, ...data.results]);
          }
          if (data.next) {
            setNextPage(page + 1);
          } else {
            setNextPage(null);
          }
          setIsLoading(false);
        });
    },
    [searchParams]
  );

  useEffect(() => {
    fetchPage(1);
  }, [searchParams]);

  const handleScroll = (event) => {
    if (
      !isLoading &&
      nextPage &&
      event.target.scrollTop + event.target.clientHeight >=
        event.target.scrollHeight
    ) {
      setIsLoading(true);
      fetchPage(nextPage);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col gap-4 grow justify-items-stretch max-w-xl min-w-0">
        <StudioSearch
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <div
          className="card bg-base-100 overflow-y-scroll max-h-96"
          onScroll={handleScroll}
        >
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
        <div className="card bg-base-100 h-96 overflow-hidden isolate">
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
