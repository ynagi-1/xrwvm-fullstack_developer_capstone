import React,{useState,useEffect} from 'react';
import Header from '../Header/Header';
export default function Dealers(){
 const [dealers,setDealers]=useState([]),[states,setStates]=useState([]),[state,setState]=useState('All'),[error,setError]=useState('');
 useEffect(()=>{fetch('/djangoapp/get_dealers').then(r=>r.json()).then(d=>{setDealers(d.dealers||[]);setStates([...new Set((d.dealers||[]).map(x=>x.state))].sort());}).catch(()=>setError('Unable to load dealers'));},[]);
 async function filter(value){setState(value);const r=await fetch('/djangoapp/get_dealers/'+encodeURIComponent(value));const d=await r.json();setDealers(d.dealers||[]);}
 const user=sessionStorage.getItem('username');
 return <><Header/><main><div className="toolbar"><h1>Car Dealerships</h1><label>Filter by State <select aria-label="Filter by State" value={state} onChange={e=>filter(e.target.value)}><option value="All">All States</option>{states.map(s=><option key={s}>{s}</option>)}</select></label></div><p className="error">{error}</p><table><thead><tr><th>ID</th><th>Dealer Name</th><th>City</th><th>Address</th><th>Zip</th><th>State</th>{user&&<th>Review Dealer</th>}</tr></thead><tbody>{dealers.map(d=><tr key={d.id}><td>{d.id}</td><td><a href={'/dealer/'+d.id}>{d.full_name}</a></td><td>{d.city}</td><td>{d.address}</td><td>{d.zip}</td><td>{d.state}</td>{user&&<td><a href={'/postreview/'+d.id}>Post Review</a></td>}</tr>)}</tbody></table><p className="endpoint">{window.location.href}</p></main></>;
}
