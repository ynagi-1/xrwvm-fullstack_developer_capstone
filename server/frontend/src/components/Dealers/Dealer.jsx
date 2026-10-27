import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../Header/Header';
export default function Dealer(){
 const {id}=useParams();const [dealer,setDealer]=useState({}),[reviews,setReviews]=useState([]),[error,setError]=useState('');
 useEffect(()=>{Promise.all([fetch('/djangoapp/dealer/'+id).then(r=>r.json()),fetch('/djangoapp/reviews/dealer/'+id).then(r=>r.json())]).then(([d,r])=>{setDealer((d.dealer||[])[0]||{});setReviews((r.reviews||[]).slice().reverse());if(r.error)setError(r.error);}).catch(()=>setError('Unable to load reviews'));},[id]);
 return <><Header/><main><h1>{dealer.full_name}</h1><p>{dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}</p>{sessionStorage.getItem('username')&&<a className="button" href={'/postreview/'+id}>Post Review</a>}<h2>Customer reviews</h2><p className="error">{error}</p>{reviews.length===0&&!error&&<p>No reviews yet.</p>}{reviews.map(r=><article className="review" key={r.id}><p className="sentiment">{r.sentiment}</p><p>{r.review}</p><p><strong>{r.name}</strong> · {r.car_make} {r.car_model} · {r.car_year}</p><p>Purchased: {r.purchase_date}</p></article>)}<p className="endpoint">{window.location.href}</p></main></>;
}
