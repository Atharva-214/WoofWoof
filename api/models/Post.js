const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const PostSchema = new Schema({
  title:String,
  summary:String,
  breed: String,
  vaccinated: String,
  age: Number,
  gender: String,
  content:String,
  cover:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
  // firstname: String,
}, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

// const postWithAuthor = await PostModel.findById(postId).populate('author', 'firstname');


module.exports = PostModel;