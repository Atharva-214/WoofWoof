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
  // firstname: author.firstname,
}, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;