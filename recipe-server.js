// 라이브러리 로드
const express = require("express");
// 서버 생성
const app = express();
// 서버 구성
/*
    bind() - ip, port를 연결 - 개통
    listen() - 대기상태
    accept() - 클라이언트가 접속시에 처리
* */
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.listen(3355,() => {
    console.log("http://localhost:3355/")
});

// 클라이언트와 통신
// 사용자의 URI
// 몽고디비 연결
const client = require("mongodb").MongoClient;

app.get('/recipe', (req, res) => {
   // request = 사용자가 요청한 정보 : page, id, pwd
   // 요청을 처리
   // 결과를 전송 = response
    let page = req.query.page;
    let rowSize = 12;
    let skip = (page * rowSize) - rowSize;
    let url = "mongodb://211.238.142.181:27017";
    client.connect(url,(err,cli)=> {
        let db = cli.db('mydb');
        // select * from recipe - find({})
        // select * from recipe where no=1 - find({no:1})
        // select * from recipe where title like '%값%' - find({'title':{"$regex":"."+값}})
        /* 
                
        */
        db.collection('recipe').find({}).skip(skip).limit(rowSize)
        .toArray((err, docs) => {
            // 요청한 사용자에게 데이터 전송
            res.json(docs);
            console.log(docs)
            cli.close();
        })
    })
});

app.get('/recipe_total', (req, res) => {
   let url = "mongodb://211.238.142.181:27017";
   client.connect(url,(err, cli) => {
       let db = cli.db('mydb');
       db.collection('recipe').find({}).count((err, count) => {
           res.json({total:Math.ceil(count/12.0)})
           cli.close();
           return count;
       })
   })
});

app.get('/recipe_detail', (req,res) => {
    let no = req.query.no;
    let url = "mongodb://211.238.142.181:27017";
    client.connect(url, (err, cli) => {
        let db = cli.db('mydb');
        db.collection('recipe_detail').find({no:Number(no)}).toArray((err, docs) => {
            res.json(docs[0])
            cli.close();
        })
    })
})

app.get('/chef', (req, res) => {
    let page = req.query.page;
    let rowSize = 50;
    let skip = (page * rowSize) - rowSize;
    let url = "mongodb://211.238.142.181:27017";
    client.connect(url,(err,cli)=> {
        let db = cli.db('mydb');
        db.collection('chef').find({}).skip(skip).limit(rowSize)
            .toArray((err, docs) => {
                res.json(docs);
                cli.close();
            })
    })
});

app.get('/chef_total', (req, res) => {
    let url = "mongodb://211.238.142.181:27017";
    client.connect(url,(err, cli) => {
        let db = cli.db('mydb');
        db.collection('chef').find({}).count((err, count) => {
            res.json({total:Math.ceil(count/12.0)})
            cli.close();
            return count;
        })
    })
});

// xml - json으로
const xml2js = require("xml2js");
// request - 외부서버
const request = require("request");

app.get('/recipe_news', (req, res) => {
    /*let query = encodeURIComponent(req.query.fd);*/
    let query = encodeURIComponent("야구");
    let url = "http://newssearch.naver.com/search.naver?where=rss&query="+query;
    // xml을 json으로 변경하는 파서기
    let parser = new xml2js.Parser({
        explicitArray:false
    })
    request({url:url},(err, request,xml) => {
        parser.parseString(xml, function(err, pjson){
            console.log(pjson.rss.channel.item)
        })
    })

})