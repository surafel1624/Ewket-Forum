import {Routes, Route, useNavigate} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { createContext, useEffect, useState } from "react";
import axios from "./API/axios";
import Ask from "./pages/ask/Ask";
import AllQuestion from "./components/question/AllQuestion";
import Question from "./components/Question/Question";

export const AppState = createContext();

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ask" element={<Ask />} />
      <Route path="/question" element={<AllQuestion />} />
      <Route path="/question/:questionid" element={<Question />} />
    </Routes>
    </AppState.Provider>
  )
}

export default App
