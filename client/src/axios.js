import axios from "axios";

const url = "https://api.themoviedb.org/3/";
const api = "YOUR TMDB API KEY"

const endpoints = {
    orignals : "discover/tv",
    trending : "trending/all/week",
    now_playing : "movie/now_playing",
    popular : "movie/popular",
    top_rated : "movie/top_rated",
    upcoming : "movie/upcoming",
};

export const fetchData = (props) => {
    return axios.get(`${url}/${endpoints[props.param]}?api_key=${api}`)
}
