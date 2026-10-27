const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const Reviews = require('./review');
const Dealerships = require('./dealership');
const app = express();
app.use(cors()); app.use(express.json());
const guard = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);
app.get('/',(req,res)=>res.json({status:'ok',service:'Express MongoDB dealership API'}));
app.get('/fetchReviews',guard(async(req,res)=>res.json(await Reviews.find().lean())));
app.get('/fetchReviews/dealer/:id',guard(async(req,res)=>res.json(await Reviews.find({dealership:Number(req.params.id)}).lean())));
app.get('/fetchDealers',guard(async(req,res)=>res.json(await Dealerships.find().sort({id:1}).lean())));
app.get('/fetchDealers/:state',guard(async(req,res)=>res.json(await Dealerships.find(req.params.state==='All'?{}:{state:req.params.state}).sort({id:1}).lean())));
app.get('/fetchDealer/:id',guard(async(req,res)=>res.json(await Dealerships.find({id:Number(req.params.id)}).lean())));
app.post('/insert_review',guard(async(req,res)=>{
 const data=req.body;
 const latest=await Reviews.findOne().sort({id:-1});
 const review=await Reviews.create({...data,id:latest?latest.id+1:1});
 res.status(201).json(review);
}));
app.use((error,req,res,next)=>{console.error(error.message);res.status(500).json({error:'Database operation failed'});});
async function start(){
 await mongoose.connect(process.env.MONGO_URL||'mongodb://127.0.0.1:27017/dealershipsDB');
 for(const [Model,file,key] of [[Dealerships,'dealerships.json','dealerships'],[Reviews,'reviews.json','reviews']]){
   if(await Model.countDocuments()===0){await Model.insertMany(JSON.parse(fs.readFileSync(path.join(__dirname,'data',file),'utf8'))[key]);}
 }
 app.listen(process.env.PORT||3030,'0.0.0.0',()=>console.log('Express MongoDB API listening on port '+(process.env.PORT||3030)));
}
start().catch(error=>{console.error(error);process.exit(1);});
