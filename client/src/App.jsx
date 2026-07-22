import {Routes, Route, useNavigate, Outlet} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { createContext, useEffect, useState } from "react";
import axios from "./API/axios";
import Ask from "./pages/ask/Ask";
import AllQuestion from "./components/Question/AllQuestion";
import Question from "./components/Question/Question";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export const AppState = createContext();

function MainLayout(){
  return(
    <>
      <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </main>
      <Footer />
    </>
  )
}

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  async function userCheck(){
    const currentToken = localStorage.getItem("token");
    if(!currentToken){
      setUser(null);
      return;
    }
    try {
      const {data} = await axios.get('/users/check', {
        headers: {
          Authorization: 'Bearer ' + currentToken
        }
      });
      setUser(data);
    } catch (error) {
      console.log(error.response.data.msg);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }
  useEffect(()=>{
    userCheck();
  }, []);

  return (
    <AppState.Provider value={{user, setUser, userCheck}}>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ask" element={<Ask />} />
            <Route path="/question" element={<AllQuestion />} />
            <Route path="/question/:questionid" element={<Question />} />
          </Route>
        </Routes>
      </main>
    </div>
    </AppState.Provider>
  )
}

export default App
