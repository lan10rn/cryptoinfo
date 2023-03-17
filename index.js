//we need to make a bitcoin fetching frontend 

const express = require('express')
const bodyparser = require('body-parser')
const request = require('request')
const axios = require('axios')
const app = express()

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/main.html")
})
let market_cap = ""
let coin = ""
let inr = ""
let usd = ""
let eur = ""
let logo = ""
let high24h = ""
let low24h = ""
let rank0 = ""
let flink = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids="
let milink = "&order=market_cap_desc&per_page=100&page=1&sparkline=false"


app.get("/info", function (req, res) {
    res.render('list', { newcoin: coin , rank: rank0 , curr_price: usd , mar_cap: market_cap, high24 : high24h , low24: low24h })
})


app.post("/", function (req, res) {
    // console.log(req.body.coin)
    coin = req.body.coin
    coin = coin.toLowerCase()

    axios.get(flink + coin + milink)
        .then((response) => {
            rank0 = response.data[0].market_cap_rank 
            high24h = response.data[0].high_24h
            low24h = response.data[0].low_24h
            usd = response.data[0].current_price
            market_cap = response.data[0].market_cap
            console.log(response.data[0].name);
            console.log(rank0);
            console.log(high24h);
            console.log(low24h);
            console.log(usd);
            console.log(market_cap);
        });
    res.redirect("/info")
})



app.listen(3000, function (err) {
    if (err)
        console.log("Error in server setup");

    console.log("Server listening on Port", 3000);
})
