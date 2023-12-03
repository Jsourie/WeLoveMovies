const knex = require("../db/connection");

function read(review_id) {
  return knex("reviews").select("*").where({ review_id}).first();
}


function update(updatedReview) {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((reviews) => reviews[0]);
}


function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}



function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  getCritic,
  read,
  update,
  destroy,
};
