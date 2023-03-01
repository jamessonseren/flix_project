import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../Services/api'
import { toast } from 'react-toastify'
import Loader from '../../Components/Loader'


import './filme.css'
export default function Filme(){
    const { id } = useParams()
    const [movie, SetMovie] = useState()
    const [loading, SetLoading] = useState(true)

    const navigation = useNavigate()

    useEffect(()=>{
        async function loadSpecificMovie(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "5b2bd35efeb56d47dfa89b96d7f60684",
                    language: "pt-BR",
                    
                }
            })
            .then((response=>{
                console.log(response.data)
                SetMovie(response.data)
                SetLoading(false)
            }))
            .catch(()=>{
                navigation("/", { replace: true })
                return
            })
           
        }
        loadSpecificMovie()
    },[navigation, id])
    if(loading){
        return(
            <div className="loading">
                <Loader />
            </div>
        )
    }
    function saveMovie(){
        const myList = localStorage.getItem('@primeflix')
        
        let savedMovies = JSON.parse(myList) || []

        const hasMovie = savedMovies.some((insertedMovie) => insertedMovie.id === movie.id)

        if(hasMovie){
            toast.warn("Este filme já está na sua lista de favoritos")
            return
        }

        savedMovies.push(movie)
        localStorage.setItem("@primeflix", JSON.stringify(savedMovies))
        toast.success("Filme salvo com sucesso")
    }

    return(
        <div className='movie-box'>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="movie poster"/>
            <p><strong>Avaliação: {movie.vote_average} / 10</strong></p>
            <h4>Sinopse: {movie.overview} {id}</h4>
            <div className='button-area'>
                <p><a onClick={saveMovie}>Salvar</a></p>
                <p><a target="_blank" href={`https://youtube.com/results?search_query=${movie.title} trailer`}>Trailer</a></p>
            </div>
        </div>
    )
}