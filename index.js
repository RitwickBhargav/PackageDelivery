const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const dburl = "mongodb://dsckiet:dsc123@ds153495.mlab.com:53495/dsckiet-demo-db";
var qw;
mongoose.Promise = global.Promise;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended:true}));
const data = require("./models/datafile.js")
mongoose.connect(dburl,(err) => {
    if(err)
        console.log(err);
    else
        console.log("Database connected");
});

app.get("/login",(req, res) =>{
    res.render("index1.ejs");
});

app.get("/",(req, res) => {
    //req from client side
    //jobhi response client ko bhejenge
    data.find({}, (err, datas)=>{
        if(err)
            console.log(err);
        console.log(datas);
        res.send(datas);
    });
});

app.post("/register", (req, res)=>{
    console.log(req.body);
    data.findOne({name: req.body.name}, (err, entry)=>{
        if(err) console.log(err);
        else if(entry)
            {
                res.render("index1.ejs")
            }
        else
            {
            data.create({name:req.body.name, email:req.body.email, password: req.body.password1},(err, done)=>{
            if(err)
            {
                res.render("error.ejs",{message: "error"});
            }
            else
            {
                res.render("index1.ejs");
            }
    });
            }
    })

});


app.get("/login",(req, res) => {
    res.render("index1.ejs");//res.send agar kuch value bhejni h aur html file ke liye res.render
});

app.get("/register",(req, res) => {
    res.render("index.ejs");//res.send agar kuch value bhejni h aur html file ke liye res.render
});

app.listen(4000, ()=> console.log("server started"));