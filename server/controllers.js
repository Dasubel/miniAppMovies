const knex = require("./dbConnection");

module.exports = {
    getAllMovies: () => {
        return knex.select("*").from("movies");
    },

    addMovie: (movieToInsert) => {
        return knex("movies")
          .insert({title: movieToInsert})
    },

    deleteMovie: async (title, res) => {
        let results = await knex("movies")
        .where("title", title)
        .del()
    }
}