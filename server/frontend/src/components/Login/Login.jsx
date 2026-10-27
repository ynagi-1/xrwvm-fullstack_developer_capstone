import React,{useState} from 'react';
import Header from '../Header/Header';
export default function Login(){
 const [error,setError]=useState('');
 async function submit(e){e.preventDefault();const data=Object.fromEntries(new FormData(e.target));const response=await fetch('/djangoapp/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json();if(response.ok){sessionStorage.setItem('username',result.userName);window.location.href='/';}else setError('Invalid username or password');}
 return <><Header/><main><h1>Login</h1><form onSubmit={submit}><label>Username<input name="userName" autoComplete="username" required/></label><label>Password<input type="password" name="password" autoComplete="current-password" required/></label><p role="alert" className="error">{error}</p><button>Login</button><p>New customer? <a href="/register">Register Now</a></p></form></main></>;
}
