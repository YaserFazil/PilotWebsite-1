import React, { useEffect, useState } from 'react'
import { PROD_HEADER } from '../Constants/constants'
import TabBar from './TabBar/TabBar'
import Report from './Report/Report'
import UserTrips from './UserTrips/UserTrips'
import './Productivity.css'

const API_URL = process.env.REACT_APP_API_URL

const Productivity = () => {
  const currentYear = new Date().getFullYear()

  const [activeTab, setActiveTab] = useState('Report')
  const [admin, setAdmin] = useState({})
  const [currUser, setCurrUser] = useState({})
  const [users, setUsers] = useState([])
  const [year, setYear] = useState(currentYear)
  const [yearArr, setYearArr] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('user_type') == 1) {
      ;(async () => {
        try {
          const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
          })

          if (response.ok) {
            const data = await response.json()
            setUsers(data.data)
          }
        } catch (error) {
          console.log(error.message)
        }
      })()
    }
    ;(async () => {
      try {
        const response = await fetch(`${API_URL}/one_user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (sessionStorage.getItem('user_type') == 2) setUsers([data.data])
          setAdmin(data.data)
          setCurrUser(data.data)
        }
      } catch (error) {
        console.log(error.message)
      }
    })()
    addNewYear()
    fetchYear()
  }, [])

  const fetchYear = async () => {
    try {
      const response = await fetch(`${API_URL}/years`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setYearArr(data.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const addNewYear = async () => {
    try {
      const response = await fetch(`${API_URL}/years`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
      })

      if (response.ok) {
        fetchYear()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='content-wrap'>
      <div className='prod-container'>
        <TabBar setActiveTab={setActiveTab} activeTab={activeTab} tabNames={PROD_HEADER} />
        {activeTab == 'Report' ? (
          <Report year={year} setYear={setYear} array={yearArr} />
        ) : (
          <UserTrips setCurrUser={setCurrUser} admin={admin} currUser={currUser} users={users} year={year} />
        )}
      </div>
    </div>
  )
}

export default Productivity
