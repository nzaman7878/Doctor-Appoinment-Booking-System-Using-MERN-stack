import React from 'react'
import Header from '../components/Header'
import SpcialityMenu from '../components/SpcialityMenu'
import TopDoctors from '../components/TopDoctors'

const Home = () => {
  return (
    <div>
        <Header />
        <SpcialityMenu />
        <TopDoctors />
    </div>
  )
}

export default Home