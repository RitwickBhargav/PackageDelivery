const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

require('dotenv').config();
require('./config/dbconnection');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

const User = require("./models/User");

app.get("/login", (req, res) => {
    res.render("index1");//res.send agar kuch value bhejni h aur html file ke liye res.render
});

app.get("/register", (req, res) => {
    res.render("index");//res.send agar kuch value bhejni h aur html file ke liye res.render
});

app.get("/login", (req, res) => {
    res.render("index1");
});

app.get("/", (req, res) => {
    //req from client side
    //jobhi response client ko bhejenge
    User.find({}, (err, datas) => {
        if (err)
            console.log(err);
        console.log(datas);
        res.send(datas);
    });
});

app.post("/register", (req, res) => {
    console.log(req.body);
    User.findOne({name: req.body.name}, (err, entry) => {
        if (err) console.log(err);
        else if (entry) {
            res.render("index1")
        } else {
            User.create({name: req.body.name, email: req.body.email, password: req.body.password1}, (err, done) => {
                if (err) {
                    res.render("error", {message: "error"});
                } else {
                    res.render("index1");
                }
            });
        }
    })

});

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error in running server");
        return;
    }
    console.log(`Server is up and running on http://localhost:${process.env.PORT}`);
});