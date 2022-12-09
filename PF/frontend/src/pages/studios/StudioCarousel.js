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
              className="carousel-item relative w-full"
            >
              <img
                src={`http://${window.location.hostname}:8000/${url}`}
                alt=""
              />
              <div className="absolute flex justify-between -translate-y-1/2 left-5 right-5 top-1/2 opacity-80">
                <button
                  className="btn btn-circle"
                  onClick={() => {
                    document
                      .getElementById(`slide-${previous}`)
                      .scrollIntoView({
                        block: "nearest",
                      });
                  }}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  className="btn btn-circle"
                  onClick={() => {
                    document.getElementById(`slide-${next}`).scrollIntoView({
                      block: "nearest",
                    });
                  }}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
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
