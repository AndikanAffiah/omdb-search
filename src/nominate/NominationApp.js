import React, { useState, useEffect } from "react";
import MovieList from "../movie-list/MovieList.js";
import NominationList from "../nomination-list/NominationList.js";
import Dexie from 'dexie';
import { render } from "react-dom";

export default function NominationApp(props) {
  const [state, setState] = useState("");
  const [loader, setLoader] = useState(false);
  const [results, setResults] = useState({});
  const [nominations, setNominations] = useState([]);
  const [modalState, setModalState] = useState({});
  const [reRender, setReRenderState] = useState(true);

  const db = new Dexie("nominations");
  db.version(1).stores({
      movies: 'imdbID,Poster,Title,Type,Year'
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
      if(reRender){
        const moviesArray = (async () => (await db.movies.orderBy("imdbID").limit(5).toArray()))()
        moviesArray.then(async (movie)=>{
            setNominations(movie);
        })
        setReRenderState(false)
      }
    },[reRender,db.movies,nominations])
    


    const toggleModal = async (e,movie) => {
      
      var modal = document.getElementById("myModal");
      if(modal.style.display === "block"){
        return (modal.style.display = "none");
      }
      await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&t=${movie.Title}&type=movie`
        )
        .then((response) => response.json())
        .then((data) => {
          setModalState(data);
      });
      return setTimeout(e=>(modal.style.display = "block"), 100);
    }


    return (
    <div className="px-3 h-100vh">
      <div id="myModal" className="modal">

      <div className="modal-content br-soft">
        <span onClick={toggleModal} className="close">&times;</span>
        <div className="d-flex d-md-block">
          <div className="col-4 w-md-100">
            <img alt="Poster" src={modalState.Poster === "N/A"? "no-img.jpg": modalState.Poster} className="h-100 w-100"/>
          </div>
          <div className="col-8 px-3 d-flex-col justify-between w-md-block w-md-100">
            <div><strong className="fs-20">Title: </strong>{modalState.Title}</div>
            <div><strong className="fs-20">Year: </strong>{modalState.Year}</div>
            <div><strong className="fs-20">Genre: </strong>{modalState.Genre}</div>
            <div><strong className="fs-20">ImdbRating: </strong>{modalState.imdbRating}</div>
            <div><strong className="fs-20 d-box-2 d-md-box-4">Plot: </strong>{modalState.Plot}</div>
            <div><strong className="fs-20 d-box-2 d-md-box-4">Writer: </strong>{modalState.Writer}</div>
            <div><strong className="fs-20">ImdbID: </strong>{modalState.imdbID}</div>
            <div><strong className="fs-20">Length: </strong>{modalState.Runtime}</div>
          </div>
        </div>
      </div>

      </div>

      <nav className="d-flex justify-center align-center py-3">
        <form onSubmit={e => e.preventDefault()} id="searchForm" className="w-50vw mb-7 bg p-3 br-soft bg-white">
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
          <div className="d-flex justify-center mt-2 absolute top-0 right-0">
              <div className="mb-4"><a href="https://github.com/AndikanAffiah/omdb-search"><strong>Link to code</strong></a></div>
          </div>
        {nominations.length === 5 ?
          <div className="d-flex mt-2 absolute top-0 left-0 bg-green p-2 br-soft color-white">
              You have nominated 5 movies
          </div> : <div></div>
          }
        </form>
      </nav>
      <section className="d-flex justify-between mx-5 mx-md-0 d-md-block">
        <main className="col-5 p-3 bg-white bs-1-1-3 br-soft w-md-100 mb-4">
          <h4 className="mb-4">Showing results for "{state}"</h4>

          <MovieList db={db} reRender={render} setReRenderState={setReRenderState} loader={loader} results={results} nominations={nominations} setNominations={setNominations} toggleModal={toggleModal} />

        </main>
        <aside className="col-5 p-3 bg-white bs-1-1-3 br-soft w-md-100">

          <NominationList db={db} reRender={render} setReRenderState={setReRenderState} nominations={nominations} setNominations={setNominations} />
        
        </aside>
      </section>
    </div>
  );
}
