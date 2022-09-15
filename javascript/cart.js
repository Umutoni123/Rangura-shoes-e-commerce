const id = new URLSearchParams(window.location.search).get('id');
const cartContent=document.querySelector('.cart')

const getDescription= async()=>{
    const res= await fetch('http://localhost:3000/cart')
}




window.addEventListener('DOMContentLoaded', () => getDescription());

