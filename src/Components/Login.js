import axios from "axios";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "./../assets/contexts/UserContext";
import logo from "./../assets/midias/Logo.png";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({});
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const { setVisibility } = useContext(UserContext);
  setVisibility(false);
  const navigate = useNavigate();

  const URL =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

  
  function autoLogin(){
    console.log('vendo se tem informações')
    const USER = JSON.parse(localStorage.getItem("user"));
    if(USER !== null && USER.connected === true){
      const userData={
        email: USER.email,
        password: USER.password
      }
      requestLogin(userData);
    }
    
  }

  function requestLogin(userData){
    setLoading(true);
    const promise = axios.post(URL, userData);
    promise.then((response) => {
      setLogin({...response.data, connected});
      navigate("/hoje");
    });
    promise.catch((err) => {
      alert("Email ou senha incorretos");
      console.log(`${err.response.status} - ${err.response.statusText}`);
      setLoading(false);
    });
  }

  function sendInputData(e) {
    e.preventDefault();
    requestLogin(user);
  }

  useEffect(()=>{
    if(Object.keys(login).length !== 0){
      localStorage.setItem("user", JSON.stringify(login));
      console.log(login)}
  }, [login]);

  useEffect(()=>{
    autoLogin()
  }, [])

  return (
    <Div>
      <img src={logo} alt="Logo" />
      <form onSubmit={(e) => sendInputData(e)}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="senha"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          disabled={loading}
          required
        />
        <div>
          <input
            type="checkbox"
            id="keepConnected"
            value={connected}
            name="connected"
            onChange={(e) => setConnected(!connected)}
            disabled={loading}
          />
          <label htmlFor="keepConnected">Mantenha-me conectado</label>
        </div>
        <button disabled={loading} type="submit">
          {!loading ? "Entrar" : <ThreeDots color="#FFFFFF" width={60} />}
        </button>
      </form>
      <Link to="/cadastro">
        <p>Não tem uma conta? Cadastre-se</p>
      </Link>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  img {
    width: 180px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input,
  button {
    width: 303px;
    height: 45px;
  }

  input {
    margin-bottom: 6px;
    padding: 10px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
  }

  input::placeholder {
    color: #dbdbdb;
    font-size: 20px;
  }

  button {
    background-color: var(--light-blue);
    border-radius: 5px;
    border: none;
    color: #ffffff;
    font-size: 21px;
    margin-bottom: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form > div {
    display: flex;
    align-items: center;
    width: 100%;
  }

  #keepConnected {
    width: 18px;
    margin-right: 15px;
  }

  form label {
    font-family: "Lexend Deca", sans-serif;
    color: var(--gray);
  }

  p {
    color: var(--light-blue);
    font-size: 14px;
    line-height: 17px;
    text-decoration-color: var(--light-blue);
  }

  a:visited {
    text-decoration-color: var(--light-blue);
  }
`;

export default Login;
