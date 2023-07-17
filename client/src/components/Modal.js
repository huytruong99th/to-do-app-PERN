import React from 'react'
import { useState } from 'react';

function Modal( {mode, task, setShowModal, getData} ) {
  const editMode = mode === "edit" ? true : false

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : 'huytruong99th@outlook.com',
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? "" : new Date()
  })

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log("OK")
        setShowModal(false)
        getData()
      }
    } catch(err) {
      console.error(err)
    }
  }

  
  const handleChange = (e) => {
    console.log('changing', e)
    const { name, value } = e.target
    setData(data => ({
      ...data,
      [name] : value
    }))

    console.log(data)
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>x</button>
        </div>
        <form>
          <input
            required
            maxLength={60}
            placeholder="Your task go here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br/>
          <label for="range">Drag to select your current progress:</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            step="10"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input className={mode} type="submit" value="SUBMIT" onClick={ editMode ? '' : postData }/>
        </form>
      </div>
    </div>
  )
}

export default Modal