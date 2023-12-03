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
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  const updatedData = await reviewService.update(updatedReview);

    const updatedReviewData = await reviewService.read(updatedReview.review_id);

  const critic = await reviewService.getCritic(updatedReview.critic_id);
  const responseData = {
    ...updatedReviewData, 
    critic,
  };

  res.json({ data: responseData });
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