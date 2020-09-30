
const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')
var cors = require('cors');
require('dotenv').config();


const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 9000;
var collection;
var impressions;
app.use(bodyParser.json());

const uri = process.env.mongoURI;
const client = new MongoClient(uri, { useNewUrlParser: true });


app.use(cors());

client.connect(err => {
    collection = client.db('clickbase').collection('clickinfo')
    impressions = client.db('clickbase').collection('impressions');
    collection.createIndex( { productID: -1,buttonClicked: -1 } )
});

app.post('/registerClick',async (req,res)=>{
    const finalObject = {
        ...req.body,
        timeClicked:new Date()
    }
    console.log("inserting")
    await collection.insertOne(finalObject)
    res.status(200).send("done")
})

app.post('/setImpression',async (req,res)=>{
    await impressions.insertOne({})
    res.status(200).send("done")
})

app.get('/getImpressions',async (req,res)=>{
    let count = await impressions.count()
    res.status(200).send({
        count:count
    })
})

app.get('/clickstoday',async (req,res)=>{

    let count = await collection.find({ 
        timeClicked : { 
          $lt: new Date(), 
          $gte: new Date(new Date().setDate(new Date().getDate()-1))
        }   
      }).count();
    console.log("timecount",count)
    res.status(200).send({
        count:count
    })
})

app.get('/getMultipleData',async (req,res)=>{
    let c = await collection.aggregate(
        [
        {
        "$group": {
            "_id": { productID : "$productID",buttonClicked:"$buttonClicked" },
            count: { $sum: 1 }
        }
        }
    ]
    )
    let countsArray = await c.toArray();
    let leftClicks = [];
    let rightClicks = [];
    let largest = {
        productID:null,
        number:-1
    };
    let smallest = null;
    let leftClickCount = 0;
    let rightClickCount = 0;
    for(var i=0;i<countsArray.length;i++){
        if(countsArray[i]._id.buttonClicked==0){
            leftClicks[countsArray[i]._id.productID] = countsArray[i].count
            if(countsArray[i].count > largest.number)
                largest ={number:countsArray[i].count,productID:countsArray[i]._id.productID};
            if(!smallest)
                smallest = {number:countsArray[i].count,productID:countsArray[i]._id.productID};
            if(smallest.number > countsArray[i].count)
                smallest = {number:countsArray[i].count,productID:countsArray[i]._id.productID};
            leftClickCount += countsArray[i].count;
        }
        else{
            rightClicks[countsArray[i]._id.productID] = countsArray[i].count
            rightClickCount += countsArray[i].count;
        }
    }
    res.status(200).send({
        leftClicks:leftClicks,
        rightClicks:rightClicks,
        largest:largest,
        smallest:smallest,
        leftClickCount:leftClickCount,
        rightClickCount:rightClickCount
    })
})

app.listen(PORT,()=>{
    console.log('App listening on port: ',PORT)
});