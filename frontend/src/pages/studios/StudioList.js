import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function getDistanceInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function StudioList({
  studios,
  selectedStudio,
  setSelectedStudio,
  myPosition,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (selectedStudio) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedStudio]);

  return studios.length > 0 ? (
    <ul>
      {studios.map((studio) => (
        <li
          key={studio.id}
          className={
            "p-8 hover:bg-base-200 active:bg-base-300 transition" +
            (studio === selectedStudio ? " bg-base-300" : "")
          }
          onClick={() => setSelectedStudio(studio)}
          ref={studio === selectedStudio ? ref : null}
        >
          <div className="flex flex-col md:flex-row gap-2 justify-between items-stretch md:items-end">
            <div>
              <div className="font-bold">{studio.name}</div>
              <div className="opacity-60">{studio.address}</div>
              <div className="opacity-60">{studio.postal_code}</div>
              <div className="opacity-60">{studio.phone_number}</div>
              <div className="opacity-60">
                {myPosition
                  ? getDistanceInKm(
                      myPosition.lat,
                      myPosition.lng,
                      studio.latitude,
                      studio.longitude
                    ).toFixed(2) + " km away"
                  : "Calculating distance..."}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {studio.amenities.map((amenity) => (
                  <div key={amenity.type} className="badge badge-secondary">
                    {amenity.type}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex md:flex-col gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${studio.latitude},${studio.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm rounded-full flex-1"
              >
                Directions
              </a>
              <Link
                to={`/studios/${studio.id}`}
                className="btn btn-primary btn-sm rounded-full flex-1"
              >
                Classes
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="italic p-8 text-center">
      Sorry, we couldn't find any studios. Try adjusting your search criteria.
    </div>
  );
}

export default StudioList;
