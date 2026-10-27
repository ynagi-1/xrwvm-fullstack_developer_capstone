import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../Header/Header';
export default function PostReview(){
 const {id}=useParams();const [cars,setCars]=useState([]),[dealer,setDealer]=useState({}),[error,setError]=useState('');
 useEffect(()=>{fetch('/djangoapp/get_cars').then(r=>r.json()).then(d=>setCars(d.CarModels||[]));fetch('/djangoapp/dealer/'+id).then(r=>r.json()).then(d=>setDealer((d.dealer||[])[0]||{}));},[id]);
 async function submit(e){e.preventDefault();const data=Object.fromEntries(new FormData(e.target));const car=cars[Number(data.car)];const response=await fetch('/djangoapp/add_review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,dealership:Number(id),car_make:car.CarMake,car_model:car.CarModel,purchase:true})});if(response.ok)window.location.href='/dealer/'+id;else setError((await response.json()).error);}
 if(!sessionStorage.getItem('username'))return <><Header/><main><a href="/login">Login to post a review</a></main></>;
 return <><Header/><main><h1>Post Review: {dealer.full_name}</h1><form onSubmit={submit}><label>Review<textarea name="review" rows={5} required/></label><label>Purchase Date<input type="date" name="purchase_date" required/></label><label>Car Make and Model<select name="car" required defaultValue=""><option value="" disabled>Choose Car Make and Model</option>{cars.map((c,i)=><option key={i} value={i}>{c.CarMake} {c.CarModel}</option>)}</select></label><label>Car Year<input name="car_year" type="number" min="1990" max="2027" required/></label><p role="alert" className="error">{error}</p><button type="submit">Post Review</button></form><p className="endpoint">{window.location.href}</p></main></>;
}
