import Post from "../models/post.model.js";

const postPopulateOptions = [
  { path: "user", select: "username firstName lastName profilePicture" },
  {
    path: "comments",
    populate: {
      path: "user",
      select: "username firstName lastName profilePicture",
    },
  },
];

export const findAllPosts = () => {
  return Post.find().sort({ createdAt: -1 }).populate(postPopulateOptions);
};

export const findPostById = (postId) => {
  return Post.findById(postId).populate(postPopulateOptions);
};

export const findPostsByUserId = (userId) => {
  return Post.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate(postPopulateOptions);
};

export const createPost = (data) => {
  return Post.create(data);
};

export const updateLikeStatus = (postId, userId, like) => {
  return Post.findByIdAndUpdate(
    postId,
    like ? { $addToSet: { likes: userId } } : { $pull: { likes: userId } },
    { new: true }
  );
};

export const deletePost = (postId) => {
  return Post.findByIdAndDelete(postId);
};
