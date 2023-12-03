const reviewService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await reviewService.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function update(req, res, next) {
  try {
    const updatedReview = {
      ...res.locals.review,
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };

    const data = await reviewService.update(updatedReview);

    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { review } = res.locals;
    await reviewService.destroy(review.review_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
