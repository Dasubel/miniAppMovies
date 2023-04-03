import { useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
var toWatchList = [];

function Details() {
    const params = useParams();
    const movieToSearch = params.title;
    const [count, setCount] = useState(0)
    const [details, setDetails] = useState('')

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=381a4eb046ea51a36e7e481b40edd693&language=en-US&query=${movieToSearch}&page=1&include_adult=false`)
            .then((res) => res.json())
            .then((data) => {
                setDetails(data)
                console.log(data.results)
            })
    }, []);


    const movieToWatch = (movieTitle) => {
        if (!toWatchList.includes(movieTitle)) {
            toWatchList.push(movieTitle);
            document.getElementById(`${movieTitle}`).style = "color:gold";
            setCount(count + 1);
        } else {
            document.getElementById(`${movieTitle}`).style = "color:blue";
            toWatchList = toWatchList.filter(movie => movie !== movieTitle)
            console.log(toWatchList)
            setCount(count + 1)
        }
    };

    return (

        <IconContext.Provider
            value={{ color: toWatchList.includes(params.title) ? "gold" : "blue", size: "1.5em" }}
        >
            Add this movie to your watch later this by clicking the heart!
            <AiFillHeart
                id={params.title}
                onClick={() => movieToWatch(params.title)}
            />
            <div>
                Details:
                {details.results.map(movie =>
                    <li key={movie.id}>
                        {movie.original_title}<br></br>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.original_title} width='250px' /><br></br>
                        {movie.overview}<br></br>
                        <br></br>
                    </li>)}
            </div>
        </IconContext.Provider>
    )
}

export default Details