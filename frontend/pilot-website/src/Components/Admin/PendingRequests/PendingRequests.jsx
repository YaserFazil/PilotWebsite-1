import React, { useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import { BiMessageSquareDetail } from 'react-icons/bi'
import './PendingRequests.css'

const PendingApprovals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, name: 'John Doe', type: 'Vacation' },
    { id: 2, name: 'Jane Smith', type: 'Vacation' },
    { id: 3, name: 'Bob Johnson', type: 'Vacation' }
  ])

  const handleAccept = (id) => {
    console.log(`Request with ID ${id} accepted`)
    // Update the state to remove the accepted request
    setPendingRequests((prevRequests) => prevRequests.filter((request) => request.id !== id))
  }

  const handleReject = (id) => {
    console.log(`Request with ID ${id} rejected`)
    // Update the state to remove the rejected request
    setPendingRequests((prevRequests) => prevRequests.filter((request) => request.id !== id))
  }

  return (
    <div className='pending-container'>
      <div className='pending-header'>
        <div className='pending-title'>
          <h1>Pending Requests</h1>
          <p>{pendingRequests?.length}</p>
        </div>
      </div>

      <div>
        <div className='pending-table-container'>
          <section className='scroll-section pt-4 table-main table-responsive' id='hoverableRows'>
            <table className='pending-table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className='pending-request'>Request Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests?.length > 0 ? (
                  <>
                    {pendingRequests?.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.name}</td>
                        <td className='pending-request'>{item?.type}</td>
                        <td>
                          <div className='action-container'>
                            <button className='btn-round accept' title='Accept' onClick={() => handleAccept(item.id)}>
                              <IoMdCheckmark />
                            </button>
                            <button className='btn-round reject' title='Reject' onClick={() => handleReject(item)}>
                              <MdClose />
                            </button>
                            <button className='btn-round detail' title='More Details' onClick={() => setIsModalOpen(!isModalOpen)}>
                              <BiMessageSquareDetail />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={3}>Not found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <span className='close-button' onClick={() => setIsModalOpen(!isModalOpen)}>
              &times;
            </span>
            <div className='modal-body'></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PendingApprovals