const express = require("express");
const jwt = require("jsonwebtoken");

const Task = require("../models/Task");

const router = express.Router();

function verify(req,res,next){

    const token =
    req.headers.authorization;

    const decoded =
    jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
}

router.post("/tasks",verify,
async(req,res)=>{

    const task = new Task({

        userId:req.user.id,
        title:req.body.title,
        description:req.body.description

    });

    await task.save();

    res.json(task);

});

router.get("/tasks",verify,
async(req,res)=>{

    const tasks =
    await Task.find({
        userId:req.user.id
    });

    res.json(tasks);

});

router.delete("/tasks/:id",
verify,
async(req,res)=>{

    await Task.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message:"Deleted"
    });

});

module.exports = router;