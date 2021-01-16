import React from 'react';


export default function MovieList (props) {
    console.log(props);
    if(props.loader){
        return (
            <div>Searching for movies, using loader</div>
        );
    }
    if(props.results.Error){
        if(props.results.type){
            return (
                <div className='color-red'>
                    ...{props.results.Error}
                </div>
            );
        }
        return (
            <div className='color-red'>
                {props.results.Error}
            </div>
        );
    }else{
        return (
            <div className="list">
                {props.results.Search ? props.results.Search.map((movie, index) => (
                    <div className="border-top-bottom-1 d-flex" key={index}>
                        <div className="img py-1">
                            <img
                            id="imt"
                            width="50"
                            src={movie.Poster}
                            alt="movie_icon"
                            />
                        </div>
                        <div className="py-2 d-flex-col justify-between">
                            <div className="px-2">
                            {movie.Title} ({movie.Year})
                            </div>
                            <div className="px-2">
                            <button className="p-1">Details</button>
                            <button className="p-1">Nominate</button>
                            </div>
                        </div>
                    </div>
                )) : <div>
                        nothing yet.. try searching for movies
                    </div>
                    } 
            </div>
        );
    }


}