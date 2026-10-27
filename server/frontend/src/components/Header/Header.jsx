import React from 'react';
export default function Header(){
 const user=sessionStorage.getItem('username');
 async function logout(e){e.preventDefault();const response=await fetch('/djangoapp/logout');if(response.ok){sessionStorage.clear();alert('You have been logged out successfully.');window.location.href='/';}}
 return <nav className="navbar"><a className="brand" href="/">Best Cars</a><a href="/">Home</a><a href="/about">About Us</a><a href="/contact">Contact Us</a><span className="user">{user?<><strong>{user}</strong> <a href="/djangoapp/logout" onClick={logout}>Logout</a></>:<><a href="/login">Login</a><a href="/register">Register</a></>}</span></nav>;
}
