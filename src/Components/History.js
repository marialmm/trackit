import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import dayjs from "dayjs";

import UserContext from "./../assets/contexts/UserContext";
import "react-calendar/dist/Calendar.css";
import "dayjs/locale/pt-br";

function History() {
  let { setVisibility, user, requestError } = useContext(UserContext);

  if(localStorage.getItem("user") !== null){
    user = JSON.parse(localStorage.getItem("user"));
  } 

  const [history, setHistory] = useState([]);
  const [date, setDate] = useState(new Date());
  const [daysTracked, setDaysTracked] = useState({
    conclued: [],
    notConclued: [],
  });

  const URL =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
  const TOKEN = user.token;
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const navigate = useNavigate();

  useEffect(() => {
    setVisibility(true);
    const promise = axios.get(URL, config);
    promise.then((response) => {
      console.log(response.data);
      setHistory(response.data);
    });
    promise.catch((err) => requestError(err, navigate));
  }, []);

  useEffect(() => {
    history.forEach((date) => {
      let conclued = true;
      date.habits.forEach((habit) => {
        conclued = conclued && habit.done;
      });
      if (conclued) {
        daysTracked.conclued.push(date.day);
      } else {
        daysTracked.notConclued.push(date.day);
      }
    });
    setDaysTracked({ ...daysTracked });
  }, [history]);

  function formatDate(date) {
    date = dayjs(date).format("DD/MM/YYYY");
    if (date !== dayjs().format("DD/MM/YYYY")) {
      if (daysTracked.conclued.includes(date)) {
        return "conclued";
      } else if (daysTracked.notConclued.includes(date)) {
        return "notConclued";
      }
    }
  }

  return (
    <Main>
      <h1>Histórico</h1>
      {Object.keys(history).length < 1 ? (
        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
      ) : (
        <StyledCalendar
          value={date}
          onChange={setDate}
          calendarType="US"
          formatDay={(locate, date) => dayjs(date).format("DD")}
          onClickDay={(date) =>
            console.log(dayjs(date).locale("pt-br").format("DD/MM/YYYY"))
          }
          tileClassName={({ date }) => {
            if (formatDate(date) === "notConclued") {
              return "notConclued";
            } else if (formatDate(date) === "conclued") {
              return "conclued";
            }
          }}
        />
      )}
    </Main>
  );
}

const Main = styled.main`
  h1 {
    margin-bottom: 17px;
  }
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: none;
  border-radius: 10px;

  .notConclued > * {
    background-color: #ea5766;
    padding: 9px;
    border-radius: 50%;
  }

  .conclued > * {
    background-color: #8cc654;
    padding: 9px;
    border-radius: 50%;
  }
`;

export default History;
