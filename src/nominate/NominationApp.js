import React, { useState, useEffect } from "react";
import MovieList from "../movie-list/MovieList.js";

export default function NominationApp(props) {
  const [state, setState] = useState("");
  const [loader, setLoader] = useState(false);
  const [results, setResults] = useState({});

  useEffect(() => {
    if (
      props.location.searchData &&
      typeof props.location.searchData.word == "string"
    ) {
      const data = props.location.searchData.word;
      setState(data);
    }
  }, [props]);

  useEffect(() => {
    if (state !== "") {
      setLoader(true);
      fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${state}`
      )
        .then((data) => data.json())
        .then((data) => {
          setLoader(false);
          setResults(data);
        })
        .catch(e => {
          setLoader(false)
          setResults({Error: 'failed to make request', type: 'failed request'})
        });
    }
  }, [state]);

  return (
    <div className="px-3 h-100vh">
      <nav className="d-flex align-center py-3">
        <form id="searchForm" className="w-100 mb-10">
          <div className="text-center fs-36 mb-4 ff-linux">
            Nominate <strong className="color-red">OMDB</strong> movies
          </div>
          <div className="d-flex justify-center">
            <div className="relative">
              <input
                value={state}
                onInput={(e) => setState(e.target.value)}
                type="text"
                className="ff-cursive h-30 br-3 fs-24 bs-17-n-13-20"
                id="search"
                placeholder="Movie name"
                required
              />
              <button
                type="submit"
                className="absolute bottom-0 right-0 mr-3 mb-1"
              >
                <img
                  src="./search-icon.png"
                  className="h-24-px"
                  alt="search-icon"
                />
              </button>
            </div>
          </div>
          <div className="d-flex justify-center mt-2">
            <div className="w-50vw d-flex justify-between">
              <div>
                <input type="radio" name="advanced search" />
                <label htmlFor="advanced-search">Advanced Search</label>
              </div>
            </div>
          </div>
        </form>
      </nav>
      <section className="d-flex justify-between mx-5">
        <main className="col-6 p-3 bg-white bs-1-1-3">
          <h4 className="">Showing results for "{state}"</h4>

          <MovieList loader={loader} results={results} />

        </main>
        <aside className="col-4 p-3 bg-white bs-1-1-3">
          <div>sdfgfdsdf</div>
        </aside>
      </section>
    </div>
  );
}
