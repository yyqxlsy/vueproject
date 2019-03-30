const app = require('express')();
const express = require('express');
const https = require("https")

app.listen(11111);

app.use(express.static("./dist"));

app.get("/proxyApi",(req,res)=>{
    
    console.log(req.query);
    let options = {
        hostname: req.query.urll,
        port: 443,
        path: `${req.query.path}?start=${req.query.start}&count=${req.query.count}`,
        method: 'GET'
    } 
    
    let p = new Promise(function(resolve){
        let data = '';
        let reqq = https.request(options,(res)=>{
            res.on('data',(chunk)=>{
                data += chunk;
            })
            res.on('end',()=>{
               
                resolve(data)
            })
        })
        reqq.end()
    })
    
    p.then((ress)=>{
        console.log(111111111111111,ress)
        res.send(ress);
    })
})
