import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function StudioCarousel({ images }) {
  return (
    <div className="carousel w-full">
      {images.length > 0 ? (
        images.map((url, index) => {
          const previous = index === 0 ? images.length - 1 : index - 1;
          const next = index === images.length - 1 ? 0 : index + 1;
          return (
            <div
              key={index}
              id={`slide-${index}`}
              className="carousel-item relative w-full scroll-mt-96"
            >
              <img
                src={`http://${window.location.hostname}:8000/${url}`}
                alt=""
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide-${previous}`} className="btn btn-circle">
                  <ChevronLeftIcon className="w-5 h-5" />
                </a>
                <a href={`#slide-${next}`} className="btn btn-circle">
                  <ChevronRightIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          );
        })
      ) : (
        <div className="carousel-item relative w-full">
          <img
            src="https://via.placeholder.com/1000x400?text=No+Images"
            alt="No images"
          />
        </div>
      )}
    </div>
  );
}

export default StudioCarousel;
