const express = require('express');
const app = express();
const cors = require('cors')
const port = 8081;
const controllers = require("./controllers");

app.use(express.json())
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Express server listening on port: ${port}`)
})

app.delete('/movies', (req, res) => {
    const { title } = req.body
    controllers.deleteMovie(title)
        .then(() => res.status(201).send({ data: `${title} removed from library` }))
})

app.get('/movies', (req, res) => {
    controllers.getAllMovies()
        .then(data => {
            res.status(200).send(data)
        })
})

app.patch('/movies', (req, res) => {
    let foundFlag = false;
    let foundMovie = {};
    movies.forEach(movie => {
        if (movie.title === req.body.title) {
            foundFlag = true;
            movie.rating = req.body.rating
            foundMovie = movie;
        }
    })
    if (foundFlag) {
        res.status(200).send(foundMovie);
    } else {
        res.status(404).send('Movie not found in library.')
    }
})

app.post('/movies', (req, res) => {
    const { title } = req.body
    controllers.addMovie(title)
        .then(() => res.status(201).send({ data: `${title} added to library` }))
})