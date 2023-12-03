const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listMovies(isShowing) {
  const query = knex("movies").select(
    "movies.movie_id",
    "movies.title",
    "movies.runtime_in_minutes",
    "movies.rating",
    "movies.description",
    "movies.image_url"
  );

  if (isShowing) {
    query
      .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
      .where({ "mt.is_showing": true })
      .groupBy(
        "movies.movie_id",
        "movies.title",
        "movies.runtime_in_minutes",
        "movies.rating",
        "movies.description",
        "movies.image_url"
      );
  }

  return query;
}


function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listTheaters(movieId) {
  return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("theaters.*", "movies_theaters.is_showing")
    .where({ "movies_theaters.movie_id": movieId });
}


async function listReviews(movieId) {
  const reviews = await knex('reviews')
    .join('critics', 'reviews.critic_id', 'critics.critic_id')
    .select('*')
    .where({ 'reviews.movie_id': movieId });

  const reviewsWithCriticDetails = reviews.map((review) => {
    const { critic_id, preferred_name, surname, organization_name, created_at, updated_at, ...rest } = review;
    return {
      ...rest,
      critic: {
        critic_id,
        preferred_name,
        surname,
        organization_name,
        created_at,
        updated_at,
      },
    };
  });

  return reviewsWithCriticDetails;
}


module.exports = {
  list,
  listMovies,
  read,
  listTheaters,
  listReviews,
};
