import React, { useState, useEffect } from "react";
import './Home.css';
import { IconContext } from "react-icons";
import { AiTwotoneEye } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
var watchedMovies = [];

const Home = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([])
    const [searchMovies, setSearchMovies] = useState('')
    const [addMovies, setAddMovies] = useState('')
    const [deletedMovies, setDeletedMovies] = useState('')
    const [count, setCount] = useState(0)
    useEffect(() => {
        fetch("http://localhost:8081/movies")
            .then((res) => res.json())
            .then((data) => {
                setMovies(data)
            })
    }, []);


    function filterMovies(arr, query) {
        let output = arr.filter((el) => el.title.toLowerCase().includes(query.toLowerCase()))
        return output.map(movie => <li key={movie.id}>{movie.title}</li>)
    }

    const AddMovie = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: addMovies })
        };
        fetch("http://localhost:8081/movies", requestOptions)
            .then(() => fetch("http://localhost:8081/movies")
                .then((res) => res.json())
                .then((data) => {
                    setMovies(data)
                }))
    }

    const DeleteMovie = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: deletedMovies })
        };
        fetch("http://localhost:8081/movies", requestOptions)
            .then(() => fetch("http://localhost:8081/movies")
                .then((res) => res.json())
                .then((data) => {
                    setMovies(data)
                }))
    }

    const watchedMovie = (movieTitle, movieId) => {
        if (!watchedMovies.includes(movieTitle)) {
            watchedMovies.push(movieTitle);
            document.getElementById(`${movieId}`).style = "color:gold";
            setCount(count + 1);
        } else {
            document.getElementById(`${movieId}`).style = "color:blue";
            watchedMovies = watchedMovies.filter(movie => movie !== movieTitle)
            console.log(watchedMovies)
            setCount(count + 1)
        }
    };

    const viewDetails = (title) => {
        navigate(`/${title}/details`)
    }

    return (
        <div>
            <center><input className='theBox' type="text" id="searchMovies" placeholder="Search.." onChange={e => setSearchMovies(e.target.value)} /></center>
            {searchMovies ?
                filterMovies(movies, searchMovies)
                :
                movies.map(movie =>     
                    <IconContext.Provider
                        id={movie.id}
                        value={{ color: watchedMovies.includes(movie.title) ? "gold" : "blue", size: "1.5em" }}
                    >
                        <Link to={`/${movie.title}/details`} />
                        <div onClick={() => viewDetails(movie.title)}>
                            {movie.title}
                        </div>
                        <p><AiTwotoneEye
                            id={movie.id}
                            onClick={() => watchedMovie(movie.title, movie.id)}
                        />
                        </p>
                    </IconContext.Provider>
                )}
            <center><input className='theBox' type="text" id="searchMovies" placeholder="Add a movie.." onChange={e => setAddMovies(e.target.value)} /></center>
            <center><button className='btn btn-dark pageBtn m-2' onClick={AddMovie}>Add</button></center>
            <center><input className='theBox' type="text" id="searchMovies" placeholder="Delete a movie.." onChange={e => setDeletedMovies(e.target.value)} /></center>
            <center><button className='btn btn-dark pageBtn m-2' onClick={DeleteMovie}>Delete</button></center>
        </div>)
};

export default Home;