import axios from 'axios'
//Base da url: https://api.themoviedb.org/3/
//Url da API: movie/now_playing?api_key=5b2bd35efeb56d47dfa89b96d7f60684&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api