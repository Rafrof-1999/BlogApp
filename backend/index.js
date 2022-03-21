const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const postRoute = require("./routes/post")
const multer = require('multer');
const path = require("path");






dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/pics", express.static(path.join(__dirname,"/pics")))

mongoose.connect(process.env.MONGO_URL).then(console.log("connected to mongo")).catch((err)=> console.log(err));

const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null,'./pics')

  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },
});

const upload = multer({ storage:filestorage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);

app.get('/', (req, res) => {
  res.send('Hello Blog')
})



app.listen(process.env.PORT || 5000, ()=>{
    console.log("Blog back is running");
})