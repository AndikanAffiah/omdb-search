import React from 'react';


export default function NominationList (props) {
    return (
        <div>
            <h4 className="mb-4 d-flex justify-between">
                <div>Nominations List</div>
                <div>
                    <button onClick={e=>(props.saveToDB(e))} className="color-white cursor-pointer p-2 border-1 bg-l-blue">Save List</button>
                    </div>
            </h4>
            <div className="list h-400-px">
            {props.nominations.map((movie, index) => (
                <div className="d-flex suggestion-list border-1 bs-1-1-5 mb-4 br-soft" key={index}>
                <div className="img py-1">
                    <img
                    id="imt"
                    width="50"
                    src={movie.Poster}
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
                            const newMovieArray = props.nominations.filter( item => { 
                                return item !== movie 
                            });
                            props.setNominations(newMovieArray);
                        }} className="p-1 w-50 bg-brick color-white br-soft border-1 cursor-pointer">Remove</button>
                    </div>
                </div>
            </div>
            ))}
            </div>
        </div>
    );
}