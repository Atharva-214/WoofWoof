const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// mongoose.connect('mongodb+srv://atharva:atharva123@cluster0.0l3siag.mongodb.net/atharvaapp');

mongoose.connect('mongodb+srv://Atharva:Atharva@dogcluster.3kmr4qh.mongodb.net/atharvaapp')// if error it will throw async error
    .then(() => { // if all is ok we will be here
      console.log("db connected");
        // return server.start();
    })
    .catch(err => { // we will not be here...
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

app.post('/register', async (req, res) => {
  const { firstname,lastname,username, password } = req.body;
  try {
    const userDoc = await User.create({
      firstname,
      lastname,
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json('No file uploaded.');
  }

  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json('Invalid or expired token.');
    }

    const { title, summary, content, breed, gender,age, vaccinated } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      breed,
      gender,age, vaccinated,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json('Invalid or expired token.');
    }

    const { id, title, summary, breed,  gender,age, vaccinated, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(403).json('You are not the author.');
    }
    await postDoc.updateOne({
      title,
      summary,
      breed, gender,age, vaccinated,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});


//route handler
app.get('/post', async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author',['firstname','username','lastname']);
  // const post = await Post.findById(id).populate('author', ['firstname']);
  // res.json(post);
  res.json(postDoc);
})

app.listen(4000,console.log("server started running"));
//