import React, { useState, useEffect } from "react";
import MovieList from "../movie-list/MovieList.js";
import NominationList from "../nomination-list/NominationList.js";
import Dexie from 'dexie';

export default function NominationApp(props) {
  const [state, setState] = useState("");
  const [loader, setLoader] = useState(false);
  const [results, setResults] = useState({});
  const [nominations, setNominations] = useState([]);
  const [modalState, setModalState] = useState({});

  let db = new Dexie("nominations");
  db.version(1).stores({
      movie: 'imdbID,Poster,Title,Type,Year'
  });

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
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${state}`
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

    useEffect(()=>{
      if(db){
        // db.tables.forEach(e => console.log(e.Title))
        // console.log(db.movie.get(1))
        const movies = (async () => (await db.movie.orderBy("imdbID").limit(5).toArray()))()
        // console.log(movies[0]);
        movies.then((movie)=>{
          setNominations(movie)
        })
      }
    },[props])
    


    const toggleModal = async (e,movie) => {
      
      var modal = document.getElementById("myModal");
      if(modal.style.display === "block"){
        return (modal.style.display = "none");
      }
      await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&t=${movie.Title}`
        )
        .then((response) => response.json())
        .then((data) => {
          setModalState(data);
      });
      return setTimeout(e=>(modal.style.display = "block"), 100);
    }

    const saveToDB = async (e) => {
      // await db.friends.bulkDelete();
      await db.movie.bulkPut(nominations);
      // console.log(a)
    }

    return (
    <div className="px-3 h-100vh">
      <div id="myModal" className="modal">

      <div className="modal-content">
        <span onClick={toggleModal} className="close">&times;</span>
        <div className="d-flex">
          <div className="col-4">
            <img alt="Poster" src={modalState.Poster} className="h-100" />
          </div>
          <div className="col-8 px-3 d-flex-col justify-between">
            <div><strong className="fs-20">Title: </strong>{modalState.Title}</div>
            <div><strong className="fs-20">Year: </strong>{modalState.Year}</div>
            <div><strong className="fs-20">Genre: </strong>{modalState.Genre}</div>
            <div><strong className="fs-20">ImdbRating: </strong>{modalState.imdbRating}</div>
            <div><strong className="fs-20">Plot: </strong>{modalState.Plot}</div>
            <div><strong className="fs-20">Writer: </strong>{modalState.Writer}</div>
            <div><strong className="fs-20">ImdbID: </strong>{modalState.imdbID}</div>
            <div><strong className="fs-20">Length: </strong>{modalState.Runtime}</div>
          </div>
        </div>
      </div>

      </div>

      <nav className="d-flex justify-center align-center py-3">
        <form onSubmit={e => e.preventDefault()} id="searchForm" className="w-50vw mb-10 bg p-3 br-soft bg-white">
          <div className="text-center fs-36 mb-4 ff-linux">
            Nominate <strong className="color-red">OMDB</strong> movies
          </div>
          <div className="d-flex justify-center w-100">
            <div className="relative">
              <input
                value={state}
                onInput={(e) => setState(e.target.value)}
                type="text"
                className="ff-cursive h-30 br-3 fs-24 bs-17-n-13-20 px-4 border-1"
                // id="search"
                placeholder="Movie name"
                required
              />
              <button
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
          {/* <div className="d-flex justify-center mt-2">
            <div className="w-50vw d-flex justify-between">
              <div>
                <input type="radio" name="advanced search" />
                <label htmlFor="advanced-search">Advanced Search</label>
              </div>
            </div>
          </div> */}
        </form>
      </nav>
      <section className="d-flex justify-between mx-5">
        <main className="col-5 p-3 bg-white bs-1-1-3 br-soft">
          <h4 className="mb-4">Showing results for "{state}"</h4>

          <MovieList loader={loader} results={results} nominations={nominations} setNominations={setNominations} toggleModal={toggleModal} />

        </main>
        <aside className="col-5 p-3 bg-white bs-1-1-3 br-soft">

          <NominationList saveToDB={saveToDB} nominations={nominations} setNominations={setNominations} />
        
        </aside>
      </section>
    </div>
  );
}
