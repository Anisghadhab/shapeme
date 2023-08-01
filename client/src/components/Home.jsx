import React,{useState}from 'react'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'
// import Main from './Main'

const Home = () => {
    const [user,setUser]=useState(null)
    const navigate = useNavigate()

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout',{},{withCredentials:true})
        .then(res =>{
            setUser(res.data)
            console.log(res.data)
            
        })
        .catch(err=>console.log(err))
        
        navigate('/')

    }
  return (
    <div> 
       <div className='d-flex justify-content-around m-2'>
        <h1>Moldy Tomatoes</h1>
        <button    className='btn btn-danger'   onClick={handleLogout}>Logout</button>
      </div>
     
        {/* <Main/> */}
        
    </div>

    
  )
}

export default Home