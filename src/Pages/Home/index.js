import { useEffect, useState } from "react"
import api from "../../Services/api"
import { Link } from "react-router-dom"
import './home.css'
import Loader from "../../Components/Loader"


//Url da API: movie/now_playing?api_key=5b2bd35efeb56d47dfa89b96d7f60684&language=pt-BR
export default function Home(){
    const [movies, SetMovies] = useState()
    const [loading, SetLoading] = useState(true)

    useEffect(()=>{
        async function loadMovies(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key: "5b2bd35efeb56d47dfa89b96d7f60684",
                    language: "pt-BR",
                    page: 1,
                }
            })
            SetMovies(response.data.results.slice(0,10))
            SetLoading(false)
        }
        loadMovies()
    
    },[])

    if(loading){
        return(
            <div className="loading">
                <Loader/>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="movies-list">
            {movies?.map((movie)=>{
                    return(
                    <article key={movie.id}>
                        <strong>{movie.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="movie poster"/>
                        <Link target="_blank" to={`/filme/${movie.id}`}>Acessar</Link>
                    </article>
                    )
                    
                })}   
            </div>
            
            {/* {movies.map((movie)=>{
                    return(
                    <article key={movie.id}>
                        <strong>{movie.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="movie poster"/>
                        <p>Descrição: {movie.overview}</p>
                    </article>
                    )
                    
                })}       */}
            
        </div>
    )
    
}