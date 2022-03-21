const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")

//Create Post
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost);
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

//Update Post
router.put("/:id", async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){

        try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },
            {new: true}
            );
            res.status(200).json(updatedPost)
        } catch (error) {
            res.status(500).json(error)

            
        }
    }
    else{
        res.status(401).json("You can only update your own post");
    }
    } catch (error) {
        res.status(500).json(error)
        
    }

})

//Delete Post
//Update Post
router.delete("/:id", async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){

        try {
            await post.delete();
            res.status(200).json("Post is Deleted!")
        } catch (error) {
            res.status(500).json(error)

            
        }
    }
    else{
        res.status(401).json("You can only delete your own post");
    }
    } catch (error) {
        res.status(500).json(error)
        
    }

})


//Get Post
router.get("/:id", async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
        
    } catch (error) {
        res.send(500).json(error)
        
    }
})

//Get All Posts
router.get("/", async (req,res) =>{
    const username = req.query.user;
    try {
        let posts;
        if(username){                                             // if posts have the same username
            posts = await Post.find({username});
        }
        else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
        
    } catch (error) {
        res.send(500).json(error)
        
    }
})





module.exports = router