import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteContainer from "./components/NoteContainer/NoteContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import axios from "axios";
import "./paper.css";


function Apple() {

  const { rollingId } = useParams();

  const [notes, setNotes] = useState([])
  useEffect(() => {

    let idBody = {
      name: rollingId
    }
    axios
    .post("/api/post", idBody)
    .then((res) => setNotes(res.data))
    
  })

  
  const addNote = (color) => {

    let tempNotes = {
      id: parseInt(Date.now() + "" + Math.floor(Math.random() * 78)),
      text: "",
      time: Date.now(),
      color,
      name:rollingId
    };
    console.log(tempNotes)
    axios
    .post("/api/post/doPost", tempNotes)
    .then((res) => console.log(res))
  };

  const deleteNote = (id) => {

    let body = {
      id: id
    };
    axios
    .post("/api/post/delete", body)
    .then((res) => console.log(res))
  };

  const updateText = (text, id) => {

    let updateNotes = {
      id: id,
      text: text
    };
    axios
    .post("/api/post/update", updateNotes)
    .then((res) => console.log(res))
  };


  return (
    <div className="layout">
      <Sidebar addNote={addNote} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        updateText={updateText}
      />
      <p>이 롤링페이퍼는 {rollingId}에게 발송될 예정입니다!</p>
    </div>
  );
}

export default Apple;