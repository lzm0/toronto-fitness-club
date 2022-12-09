import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function StudioSearch({ searchParams, setSearchParams }) {
  const [modalVisibility, setModalVisibility] = useState(false);

  const [name, setName] = useState("");
  const [amenities, setAmenities] = useState("");
  const [classes, setClasses] = useState("");
  const [coaches, setCoaches] = useState("");

  const handleClear = () => {
    setAmenities("");
    setClasses("");
    setCoaches("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({
      ...searchParams,
      name,
      amenities,
      classes,
      coaches,
    });
    setModalVisibility(false);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="w-full flex flex-row gap-4">
        <input
          type="text"
          placeholder="Search by studio name..."
          className="input grow input-primary"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div
          className="btn btn-primary gap-1"
          onClick={() => setModalVisibility(true)}
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          Filters
        </div>
        <input type="submit" hidden />
        <div
          className={
            "modal modal-bottom sm:modal-middle" +
            (modalVisibility ? " modal-open" : "")
          }
        >
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setModalVisibility(false)}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Filters</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amenities</span>
              </label>
              <input
                type="text"
                placeholder="Amenities, separated by commas."
                className="input input-bordered"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Classes</span>
              </label>
              <input
                type="text"
                placeholder="Classes, separated by commas."
                className="input input-bordered"
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coaches</span>
              </label>
              <input
                type="text"
                placeholder="Coaches, separated by commas."
                className="input input-bordered"
                value={coaches}
                onChange={(e) => setCoaches(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <div className="btn btn-ghost" onClick={handleClear}>
                Clear
              </div>
              <input type="submit" value="Apply" className="btn btn-primary" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default StudioSearch;
