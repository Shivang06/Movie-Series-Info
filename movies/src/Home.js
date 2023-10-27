import React, { useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom';

function Home() {
    
    const [query,setQuery] = useState("");
    const [movie,setMovie] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ show: "false", msg: "" });


    const url = `https://www.omdbapi.com/?apikey=8b46411d&s=${query}`;
    const getMovies = async (url) => {
      setIsLoading(true);
      try{
          const res = await fetch(url);
          const data = await res.json();
          // console.log("working");
          console.log(data);
          if (data.Response === "True"){
            setIsLoading(false);
            setIsError({
              show: false,
              msg: "",
            });
            setMovie(data.Search);

          }
          else{
            if(query===""){
              setIsError({
                show: true,
                msg: "Type a movie name."
              });
              setIsLoading(false);
            }else{
              setIsError({
                  show: true,
                  msg: data.Error,
              });
              setIsLoading(true);
          }
        }
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(()=>{
      let timerOut = setTimeout(()=>{
          getMovies(url);

      },500);
      return () => clearTimeout(timerOut);
  },[query,url]);
  
  // if (isLoading) {
  //   return (
  //     <section  >
  //       <div className="loading">Loading....</div>;
  //     </section>
  //   );
  // }


  return (
    <div>
      <section className="search-section">
        <h2>Search Your Favourite Movie</h2>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="search movie"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
        </section>

        <div className="card-error">
          <p>{isError.show && isError.msg}</p>
        </div>

        <section className="movie-page">
        <div className='grid grid-4-col'>
          
        
          {movie.map((e) => {
            
                const { imdbID, Title, Poster } = e;
                const movieName = Title.substring(0, 15);
                 return (
                
                  <NavLink to={`movie/${imdbID}`} key={imdbID}>
                    <div className="card">
                      <div className="card-info">
                        <h2>
                          {movieName.length > 13
                            ? `${movieName}...`
                            : movieName}
                        </h2>
                        <img src={Poster} alt="#" />
                      </div>
                    </div>
                  </NavLink>
                 );
              })
}
</div>
        
      </section>
    </div>
  )
}

export default Home;