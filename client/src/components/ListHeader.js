import React from 'react'
import Modal from './Modal'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

function ListHeader({ listName, getData }) {
    const [cookies, setCookie, removeCookie] = useCookies(null)

    const [showModal, setShowModal] = useState(false)

    const signOut = () => {
      removeCookie('Email')
      removeCookie('AuthToken')
      window.location.reload()
    }


  return (
    <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
            <div className='user-name'>
              <p>Welcome Back User <span>{cookies.Email}</span></p>
            </div>
            <div className="btn-container"> 
              <button className="create-btn" onClick={() => setShowModal(true)}>ADD NEW</button>
              <button className="signout-btn" onClick={signOut}>SIGN OUT</button>
            </div>

        </div>
        {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>} 
    </div>
  )
}

export default ListHeader