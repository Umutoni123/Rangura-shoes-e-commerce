const form= document.querySelector('form')
const login= async(e) => {
    e.preventDefault()
    console.log(form)
    const res= await fetch(' http://localhost:3000/cart')
    const data= await res.json()
    let token= ''
    data.map(value =>{
        token=value.email
        
    })
    console.log(token)
    localStorage.setItem('token',token)
    if(!token){
        console.log(token)
    }
    else{
        location.replace('../index.html')
    }
}

form.addEventListener('submit',login)