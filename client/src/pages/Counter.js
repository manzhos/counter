import React, { useEffect, useState, useCallback } from 'react'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'

export const Counter = () => {
  const [counter, setCounter] = useState([])
	const {loading, request} = useHttp()
	const url = '/counter/counter'
  const fetchCounter = useCallback( async (url) => {
		try {
			const fetched = await request(url, 'GET', null, {})
			setCounter(fetched)
		} catch (e) {
      console.log('error', e)
    }
	}, [request])

	useEffect( () => { fetchCounter(url) }, [fetchCounter])
  
  if (loading) {
    return <Loader />
  }



  const inccountHandler = async () => {
    try {
      var count = counter.count + 1
      var ID = counter._id
      await request('/counter/changecounter', 'POST', {count, ID}, {})
    } catch (e) {
      console.log('error', e)
    }
  }

  const deccountHandler = async () => {
    try {
      if (counter.count > 1) {
        var count = counter.count - 1
      } 
      var ID = counter._id
      await request('/counter/changecounter', 'POST', {count, ID}, {})
    } catch (e) {
      console.log('error', e)
    }
  }

  const resetcountHandler = async () => {
    try {
      if (counter[0].count > 1) {
        var count = 0
      }
      var ID = counter[0]._id
      await request('/counter/changecounter', 'POST', {count, ID}, {})
    } catch (e) {
      console.log('error', e)
    }
  }

  return(
    <>
      <div className="container mt-4 text-center">
        <h1>COUNTER</h1>
        <p className='text-black-50 fw-light fs-6'>Press a blue button to start a count</p>
        <div className='mt-3'>&nbsp;</div>
        <div onClick={inccountHandler} type='button' className='inc-button' >
          <h2 className='pos-center'>
            { counter.length === 0 ? '0' : '' }
            { counter.length !== 0 ? counter.count : '0' }
          </h2>
        </div>
        <div className='mt-1'>&nbsp;</div>
        <div onClick={deccountHandler} type='button' className='dec-button'>
          <p className='pos-center fw-bolder'>DEC</p>
        </div>
        <div className='mt-3'>&nbsp;</div>
        <div onClick={resetcountHandler} type='button' className='reset-button'>Reset counter</div>
      </div>
    </>
  )
}
