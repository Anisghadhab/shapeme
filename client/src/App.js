import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { useState } from 'react';
import Routines from './components/Routines'
import NewRoutine from './components/NewRoutine';
import ShowOneRoutine from './components/ShowOneRoutine';
import EditRoutine from './components/EditRoutine';
import ShowOneWorkout from './components/ShowOneWorkout';
import Home from './components/Home';
import Chart from './components/Chart'
import SideNav from './components/SideNav';
import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TestProfile from './components/TestProfile';
import OtherProfile from "./components/OtherProfile"
import Introduction from './components/Introduction';
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userName, setUserName] = useState("")
  const [userId, setUserId] = useState('')
  useEffect(() => {
    const navigationTo = async () => {
        if (!localStorage.getItem('userLogedIn')) {
            // navigate("/login");
        }
        else {
            setCurrentUser(await JSON.parse(localStorage.getItem('userLogedIn')));
            // setIsLoaded(true);
            console.log("hello user",userName)
        }
    }
    navigationTo();
}, []);



  return (

    <div className="App">

      <Routes>
        <Route element={<LandingPage setUserName={setUserName} setUserId={setUserId} />} path="/login" />
        {/* <Route element={<Home />} path="/movies" /> */}
        <Route element={<Routines userId={userId} userName = {userName}/>} path='/shapeme/routines' />
        <Route element={<NewRoutine userId={userId} />} path='/shapeme/routines/new' />
        <Route element={<ShowOneRoutine userId={userId} />} path='/shapeme/routine/:id' />
        <Route element={<EditRoutine />} path='/shapeme/edit-routine/:id' />
        {/* <Route element={<MyProfile userName = {userName} userId = {userId} />} path='/shapeme/profile' /> */}
        <Route element={<OtherProfile  />} path='/shapeme/profile/:id' />
        <Route element={<ShowOneWorkout />} path='/shapeme/workout/:id' />
        <Route element={<Chart/>} path='/shapeme/chart' />
        <Route element={<SideNav />} path='/shapeme/navbar' />
        <Route element={<Dashboard userId = {userId} userName = {userName}/>} path='shapeme/dashboard'/> 
        <Route element={<TestProfile />} path='/shapeme/profile' />
        <Route element={<Introduction/>} path='/' />
      </Routes>
    </div>
  );
}

export default App;
