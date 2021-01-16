import { React, useState } from "react";
import { Link } from "react-router-dom";
// import ListData from "./list/ListData.js";

export default function HomeSearch(props) {
  const [movies, setMovies] = useState([]);
  const [searchData, setSearchData] = useState({
    word: "",
  });

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: value,
    }));

    await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${value}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          console.log(data.Search);
          if (typeof data.Search !== "string") {
            setMovies(data.Search);
          }
        }
      });
  };
  const goToPage = (data) => {
    props.history.push({
      pathname: "/nominate",
      searchData: data,
    });
  };
  const handleSubmit = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    goToPage(searchData);
  };

  return (
    <div className="main">
      <div className="absolute top-0 left-0 w-100 h-100 py-3">
        <div className="relative w-100 h-100">
          <div className="d-flex justify-between h-200-px transform-z-15 absolute top-200">
            <div className="w-130-px h-170-px mx-5 d-flex justify-center align-center">
              <div className="card w-100-px h-140-px bg-l-blue">sdfgfd</div>
            </div>
          </div>
          <div className="d-flex justify-between h-200-px transform-z-15 absolute top-500">
            <div className="w-130-px h-170-px mx-5 d-flex justify-center align-center">
              <div className="card w-100-px h-140-px bg-l-blue">sdfgfd</div>
            </div>
          </div>
          <div className="d-flex justify-between h-200-px transform-z-15 absolute top-800 bottom-0">
            <div className="w-130-px h-170-px mx-5 d-flex justify-center align-center">
              <div className="card w-100-px h-140-px bg-l-blue">sdfgfd</div>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        id="searchForm"
        className="mb-10 z-3 bg-white px-10 pb-10 br-3 bs-1-1-3"
      >
        <div className="text-center fs-36 mb-4 ff-linux">
          Search <strong className="color-red">OMDB</strong> movies
        </div>
        <div className="relative">
          <div className="p-2">
            <input
              onChange={handleInputChange}
              type="text"
              name="word"
              className="ff-cursive h-30 br-3 fs-24"
              id="search"
              autoFocus={true}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="absolute bottom-2-rem right-2-rem mr-3 mb-1"
          >
            <Link
              to={{
                pathname: "/nominate",
                searchData,
              }}
            >
              <img
                src="./search-icon.png"
                className="h-24-px"
                alt="search-icon"
              />
            </Link>
          </button>
        </div>
        <div id="suggestion" className="absolute w-50vw bg-white z-3 br-b-3">
          {movies.length > 0 ? (
            movies.length === 1 ? (
              <div
                onClick={() => goToPage({word: movies[0].Title})}
                className="py-3 suggestion-list mx-n-4 px-4"
              >
                {movies[0].Title}
              </div>
            ) : (
              movies.slice(-5, -1).map((movie, index) => (
                <div
                  onClick={() => goToPage({word: movie.Title})}
                  key={index}
                  className="py-3 suggestion-list mx-n-4 px-4"
                >
                  {movie.Title}
                </div>
              ))
            )
          ) : (
            <div className="py-3 bg-white"></div>
          )}
        </div>
      </form>
    </div>
  );
}