const posts = [];

function addNewPost(userID, message) {
  let myPost = {
    postedBy: userID,
    message: message,
    likes: 0,
    time: Date.now(),
  };
  posts.unshift(myPost);
}

function getPosts(n = 3) {
  return posts.slice(0, n);
}

module.exports = { addNewPost, getPosts };
