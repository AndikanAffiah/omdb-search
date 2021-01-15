import React, { useState } from "react";


export default function NominationApp(props){
    console.log(props)
    const [state, setState] = useState({
        keyWord: ""
    });
    // if(props.location.searchData && typeof props.location.searchData.word == "string"){
    //     console.log(props.location.searchData)
    //     if(props.location.searchData !== false){
    //         setState(prevState => ({
    //             ...prevState,
    //             keyWord: props.location.searchData.word
    //         }));
    //     }
    //     props.location.searchData = false;
    //     console.log(state);
    // }
    // const [state, setState] = useState({
    //     state: null,
    //     movies: null,
    // });

    // useEffect(()=>{
    //     // e
    // });

    return(
        <div className="px-3 h-100vh">
            <nav className="d-flex align-center py-3">
                <form id="searchForm" className="w-100 mb-10">
                    <div className="text-center fs-36 mb-4 ff-linux">Nominate <strong className="color-red">OMDB</strong> movies</div>
                    <div className="d-flex justify-center">
                        <div className="relative">
                            <input type="text" className="ff-cursive h-30 br-3 fs-24 bs-17-n-13-20" id="search" placeholder="Movie name" required />
                            <button type="submit" className="absolute bottom-0 right-0 mr-3 mb-1" >
                                <img src="./search-icon.png" className="h-24-px" alt="search-icon" />
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
                    <h4 className="">Showing results for "apple firm"</h4>
                    <div className="list">
                        <div className="border-top-bottom-1 d-flex">
                            {/* <div className="img py-1"><img id="imt" width="50" src="https://m.media-amazon.com/images/M/MV5BMjM3ODY3Njc5Ml5BMl5BanBnXkFtZTgwMjQ5NjM5MTI@._V1_SX300.jpg" alt="movie_icon"></div> */}
                            <div className="py-2 d-flex-col justify-between">
                                <div className="px-2">Legend of the living birds of flight - 1999</div>
                                <div className="px-2">
                                    <button className="p-1">Details</button>
                                    <button className="p-1">Nominate</button>
                                </div>
                            </div>
                        </div>
                        <div className="border-top-bottom-1 d-flex">
                            {/* <div className="img py-1"><img id="imt" width="50" src="https://m.media-amazon.com/images/M/MV5BNmU2NjM0YzUtMjNhOS00NGE3LTk3NmItMmZlZTI1MzI1NWU1XkEyXkFqcGdeQXVyODM4NjEyMTA@._V1_SX300.jpg" alt="movie_icon"></div> */}
                            <div className="py-2 d-flex-col justify-between">
                                <div className="d-flex justify-between">
                                    <div className="px-2">Legend of the living birds of flight - 1999</div>
                                    <div>5 star</div>
                                </div>
                                <div className="px-2">
                                    <button className="p-1">Details</button>
                                    <button className="p-1" disabled>Nominate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <aside className="col-4 p-3 bg-white bs-1-1-3">
                    <div>sdfgfdsdf</div>
                </aside>
            </section>
        </div>
    );
}