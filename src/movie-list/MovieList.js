import React from "react";

export default function MovieList(props) {

  const handleNominateClick = (e) => {
    e.target.disabled = true;
  }

  if (props.loader) {
    return <div className="d-flex justify-center">
        <div className="loader"></div>
    </div>;
  }
  if (props.results.Error) {
    if (props.results.type) {
      return <div className="color-red">...{props.results.Error}</div>;
    }
    return <div className="color-red">{props.results.Error}</div>;
  } else {
    return (
      <div className="list h-400-px h-md-200-px">
        
        {props.results.Search ? (
          props.results.Search.map((movie, index) => (
            <div className="d-flex w-90 border-1 br-soft mb-4 bs-1-1-5 my-2 suggestion-list" key={index}>
              <div className="img">
                <img id="imt" width="50" src={movie.Poster === "N/A"? "no-img.jpg": movie.Poster} alt="movie_icon" />
              </div>
              <div className="py-2 d-flex-col justify-between w-100">
                <div className="px-2 fs-15">
                  {movie.Title} ({movie.Year})
                </div>
                <div className="px-2 w-90 d-flex justify-between">
                  <button onClick={e => props.toggleModal(e,movie)} className="p-2 br-soft border-1 bg-blue color-white cursor-pointer">Details</button>
                  <button
                    disabled={props.nominations.some(element => 
                        element.imdbID  === movie.imdbID 
                    )}
                    
                    onClick={async (e) => {
                      let moviesLength;
                      const moviesArray = (async () => (await props.db.movies.orderBy("imdbID").limit(5).toArray()))()
                      moviesArray.then(async (movies)=>{
                        moviesLength = movies.length
                        if(moviesLength < 5){
                          await props.db.movies.put(movie);
                          handleNominateClick(e);
                          props.setReRenderState(true)
                        }
                      })
                    }}
                    className="p-2 br-soft border-1 bg-green color-greywhite cursor-pointer fs-md-12"
                  >
                    Nominate
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>nothing yet.. try searching for movies</div>
        )}
        
      </div>
    );
  }
}
