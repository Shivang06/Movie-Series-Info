import React from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { useState , useEffect } from 'react';
function SingleMovie() {
  const {id} = useParams();
  console.log(id);
  const [isLoading,setIsLoading] = useState(true);
  const [movie,setMovie] = useState("");
  const url= `https://www.omdbapi.com/?apikey=8b46411d&i=${id}`
 
  const getMovies = async (url) => {
      setIsLoading(true);
      try{
          const res = await fetch(url);
          const data = await res.json();
          if (data.Response === "True"){
              setIsLoading(false);
              setMovie(data);
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
  },[id,url]);
  if (isLoading) {
      return (
        <section className="movie-section ">
          <div className="loading">Loading....</div>;
        </section>
      );
    }
return (
  
    <section className="movie-section">
    <div className="movie-card">
      <figure>
        <img src={movie.Poster} alt="" />
      </figure>
      <div className="card-content">
        <p className="title">{movie.Title}</p>
        <p className=""></p>
        <p className="card-text"><b>Ratings: </b>{movie.imdbRating} / 10 </p>
        <p className="card-text"><b>Genre: </b>{movie.Genre}</p>
        <p className="card-text"><b>Release Date: </b>{movie.Released}</p>
        <p className='card-text'><b>Plot: </b>{movie.Plot}</p>
        <p className="card-text"><b>Cast: </b>{movie.Actors}</p>
        <p className="card-text"><b>Director: </b>{movie.Director}</p>
        {/* <p className="card-text">{movie.Country}</p> */}
        <NavLink to="/" className="back-btn">
          Go Back
        </NavLink>
      </div>
    </div>
  </section>
  
)
}

export default SingleMovie
