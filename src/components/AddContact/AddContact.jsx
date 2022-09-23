import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'

function AddContact() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const contacts = useSelector((state) => state)

  const handleSubmit = (e) => {
    e.preventDefault()

    const checkNumber = contacts.find(
      (contact) => contact.number == parseInt(number)
    )

    const data = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      number,
    }

    if (!name || !number) {
      return toast.error('Please fill in all fields!')
    }

    if (checkNumber) {
      return toast.error('This number already exists!')
    }

    dispatch({ type: 'ADD_CONTACT', payload: data })
    toast.success('Contact Added Success!')
    navigate('/')
  }

  return (
    <>
      <Toaster />
      <div className='layout my-12'>
        <h2 className='flex justify-center text-2xl font-semibold text-gray-900'>
          Add Contact
        </h2>

        <div className='mt-12 flex justify-center rounded-md bg-indigo-100/40'>
          <form className='my-8' onSubmit={handleSubmit}>
            <div>
              <input
                type='text'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              ></input>
            </div>

            <div className='mt-8'>
              <input
                type='number'
                placeholder='No Telp'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                maxLength={12}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              ></input>
            </div>

            <button
              type='submit'
              className='mt-8 h-10 w-32 rounded-md bg-blue-600 text-lg font-semibold text-white hover:bg-blue-700'
            >
              Add Contact
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddContact
