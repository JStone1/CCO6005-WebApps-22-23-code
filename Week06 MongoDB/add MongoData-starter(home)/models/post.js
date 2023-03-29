const posts = [];
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  postedBy: String,
  message: String,
  likes: Number,
  time: Date,
  tags: [String],
  comments: [
    {
      commentBy: String,
      comment: String,
      time: Date,
    },
  ],
});

// Schemas for my own social media app
const myPostSchema = new Schema({
  username: String,
  profileScore: Number,
  userImage: "?",
  timePosted: Date,
  postText: String,
  postImage: "?",
  postScore: Number,
  amountPostVoted: Number,
  postReview: String,
});

const myProfileSchema = new Schema({
  username: String,
  userImage: "?",
  bio: String,
  profileScore: Number,
  amountProfileVoted: Number,
  recentPosts: Array,
});

const Post = model("testpost", postSchema);

function addNewPost(userID, post) {
  let myPost = {
    postedBy: userID,
    message: post.message,
    likes: 0,
    time: Date.now(),
  };
  // posts.unshift(myPost);
  Post.create(myPost).catch((error) => {
    console.log("Error: ", error);
  });
}

async function getPosts(n = 3) {
  let data = [];
  await Post.find({})
    .sort({ time: -1 })
    .limit(n)
    .exec()
    .then((mongoData) => {
      data = mongoData;
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  return data;
}

module.exports = { addNewPost, getPosts };
