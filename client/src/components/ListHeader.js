import React from 'react'
import Modal from './Modal'
import { useState } from 'react'

function ListHeader({ listName, getData }) {

    const [showModal, setShowModal] = useState(false)
    const signOut = () => {
        
    }


  return (
    <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
            <button className="create-btn" onClick={() => setShowModal(true)}>ADD NEW</button>
            <button className="signout-btn" onClick={signOut}>SIGN OUT</button>
        </div>
        {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>} 
    </div>
  )
}

export default ListHeader