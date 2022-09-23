import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function EditContact() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const contacts = useSelector((state) => state)
  const currentContact = contacts.find((contact) => contact.id === parseInt(id))

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name)
      setNumber(currentContact.number)
    }
  }, [currentContact])

  const handleSubmit = (e) => {
    e.preventDefault()

    const checkNumber = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.number == parseInt(number)
    )

    const data = {
      id: parseInt(id),
      name,
      number,
    }

    if (!name || !number) {
      return toast.error('Please fill in all fields!')
    }

    if (checkNumber) {
      return toast.error('This number already exists!')
    }

    dispatch({ type: 'UPDATE_CONTACT', payload: data })
    toast.success('Contact Updated Success!')
    navigate('/')
  }

  return (
    <>
      <Toaster />
      <div className='layout my-12'>
        <h2 className='flex justify-center text-2xl font-semibold text-gray-900'>
          Edit Contact {id}
        </h2>

        {currentContact ? (
          <div className='mt-12 flex justify-center rounded-md bg-indigo-100/40'>
            <form className='my-8' onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  placeholder='Full Name'
                  required='required'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                ></input>
              </div>

              <div className='mt-8'>
                <input
                  type='number'
                  placeholder='No Telp'
                  required='required'
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                ></input>
              </div>

              <div className='flex justify-between'>
                <button
                  type='submit'
                  className='mt-8 h-10 w-32 rounded-md bg-blue-600 text-lg font-semibold text-white hover:bg-blue-700'
                >
                  Edit Contact
                </button>

                <div className='mt-8 h-10 w-32 items-center rounded-md bg-red-600 text-lg font-semibold text-white hover:bg-red-700'>
                  <Link to='/' className='mt-1 flex justify-center'>
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <h2 className='mt-12 flex justify-center text-2xl font-semibold text-gray-900'>
            Contact id {id} not exists
          </h2>
        )}
      </div>
    </>
  )
}

export default EditContact
