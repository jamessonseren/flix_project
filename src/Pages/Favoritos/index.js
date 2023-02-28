import './favoritos.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Favoritos(){
    const [movies, setMovies] = useState()

    useEffect(()=>{
        const myList = localStorage.getItem("@primeflix")
        setMovies(JSON.parse(myList) || [])

    },[])
    function removeMovie(id){
        let filterMovies = movies.filter((item)=>{
            return(item.id !== id)
        })
        setMovies(filterMovies)
        localStorage.setItem("@primeflix", JSON.stringify(filterMovies))
        toast.success("Filme removido com sucesso")
    }
    return(
        <div className="page-favourites">
            {movies?.length === 0 && <span>Você não possui nenhum filme savo :(</span>}
           <ul>
            {movies?.map((item)=>{
                return(
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            <div><Link to={`/filme/${item.id}`}>Ver detalhes...</Link></div>
                            <button onClick={()=>removeMovie(item.id)}>Remover</button>
                        </div>
                    </li>
                )
            })}
           </ul>
        </div>
    )
}