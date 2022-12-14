import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import StudioCarousel from "./StudioCarousel";
import StudioClasses from "./StudioClasses";
import StudioClassesSearch from "./StudioClassesSearch";

export function loader({ params }) {
  return fetch(`/api/studios/${params.id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((response) => response.json());
}

function StudioDetail() {
  const studio = useLoaderData();

  const [searchParams, setSearchParams] = useState({});

  return studio ? (
    <div className="flex justify-center p-4 bg-base-200">
      <div className="flex flex-col gap-4 grow justify-items-stretch max-w-xl min-w-0">
        <div className="card bg-base-100 overflow-hidden isolate">
          <StudioCarousel images={studio.images} />
        </div>
        <div className="card bg-base-100">
          <div className="card-body flex flex-col md:flex-row gap-2 justify-between items-stretch md:items-end">
            <div>
              <div className="card-title">{studio.name}</div>
              <div className="opacity-60">{studio.address}</div>
              <div className="opacity-60">{studio.postal_code}</div>
              <div className="opacity-60">{studio.phone_number}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {studio.amenities.map((amenity) => (
                  <div key={amenity.type} className="badge badge-secondary">
                    {amenity.type}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${studio.latitude},${studio.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm rounded-full grow"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <h3 className="card-title">Classes</h3>
            <StudioClassesSearch
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <StudioClasses studio={studio} searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default StudioDetail;
