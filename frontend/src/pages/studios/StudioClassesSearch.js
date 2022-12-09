function StudioClassesSearch({ setSearchParams }) {
  const handleSearch = (event) => {
    event.preventDefault();
    const fields = ["name", "coach", "start_time", "end_time"];
    let params = {};
    fields.forEach((field) => {
      const value = event.target[field].value;
      if (value) {
        params[field] = value;
      }
    });
    setSearchParams(params);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="from-control flex-1">
          <label className="label">
            <span className="label-text">Later than</span>
          </label>
          <input
            type="datetime-local"
            name="start_time"
            className="input input-bordered w-full"
          />
        </div>
        <div className="from-control flex-1">
          <label className="label">
            <span className="label-text">Earlier than</span>
          </label>
          <input
            type="datetime-local"
            name="end_time"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          name="name"
          placeholder="Class name"
          className="grow input input-bordered"
        />
        <input
          type="text"
          name="coach"
          placeholder="Coach"
          className="input input-bordered"
        />
      </div>
      <input type="submit" value="Search" className="btn btn-secondary" />
    </form>
  );
}

export default StudioClassesSearch;
