import React,{useState} from 'react';
import Header from '../Header/Header';
export default function Register(){
 const [error,setError]=useState('');
 async function register(e){e.preventDefault();const data=Object.fromEntries(new FormData(e.target));const response=await fetch('/djangoapp/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json();if(response.ok){sessionStorage.setItem('username',result.userName);window.location.href='/';}else setError(result.error||'Registration failed');}
 return <>
<Header/>
<main>
<h1>Sign up</h1>
<form onSubmit={register}>
<label>Username<input name="userName" placeholder="Username" autoComplete="username" required/>
</label>
<label>First Name<input name="firstName" placeholder="First Name" autoComplete="given-name" required/>
</label>
<label>Last Name<input name="lastName" placeholder="Last Name" autoComplete="family-name" required/>
</label>
<label>Email<input name="email" placeholder="email" type="email" autoComplete="email" required/>
</label>
<label>Password<input name="password" placeholder="Password" type="password" minLength={8} autoComplete="new-password" required/>
</label>
<p role="alert" className="error">{error}</p>
<button type="submit">Register</button>
</form>
</main>
</>;
}
