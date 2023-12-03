const movieService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function read(req, res) {
  res.json({ data: res.locals.product });
}

async function listShowing(req, res, next) {
  const isShowing = req.query.is_showing === "true";

  try {
    const data = await movieService.listMovies(isShowing);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function listTheaters(req, res, next) {
  const movieId = req.params.movieId;

  try {
    const theaters = await movieService.listTheaters(movieId);
    res.json({ data: theaters });
  } catch (error) {
    next(error);
  }
}

async function listReviews(req, res, next) {
  const movieId = req.params.movieId;

  try {
    const reviews = await movieService.listReviews(movieId);
    res.json({ data: reviews });
  } catch (error) {
    next(error);
  }
}



function movieExists(req, res, next) {
  movieService
    .read(req.params.movieId)
    .then((movie) => {
      if (movie) {
        res.locals.product = movie;
        return next();
      }
      next({ status: 404, message: `Movie cannot be found.` });
    })
    .catch(next);
}

module.exports = {
  read: [movieExists, read],
  listShowing: asyncErrorBoundary(listShowing),
  listTheaters: [movieExists, asyncErrorBoundary(listTheaters)],
  listReviews: [movieExists, asyncErrorBoundary(listReviews)],
};
