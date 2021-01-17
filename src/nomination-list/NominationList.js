import React from 'react';


export default function NominationList (props) {
    return (
        <div>
            <h4 className="mb-4 d-flex justify-between">
                <div>Nominations List</div>
            </h4>
            <div className="list h-400-px">
            { props.nominations.length > 0 ? props.nominations.map((movie, index) => (
                <div className="d-flex suggestion-list border-1 bs-1-1-5 mb-4 br-soft" key={index}>
                <div className="img py-1">
                    <img
                    id="imt"
                    width="50"
                    src={movie.Poster === "N/A"? "no-img.jpg": movie.Poster}
                    alt="movie_icon"
                    />
                </div>
                <div className="py-2 d-flex-col justify-between w-100">
                    <div className="px-2 fs-15">
                    {movie.Title} ({movie.Year})
                    </div>
                    <div className="px-2 w-90 d-flex justify-center">
                        <button 
                        onClick={e => {
                            props.db.movies.delete(movie.imdbID);
                            props.setReRenderState(true);
                        }} className="p-1 w-50 bg-brick color-white br-soft border-1 cursor-pointer fs-md-12">Remove</button>
                    </div>
                </div>
            </div>
            )) : <div>No nominations yet, try searching..</div>}
            </div>
        </div>
    );
}