import React from 'react'
import Header from '../components/Header'
import SpcialityMenu from '../components/SpcialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
        <Header />
        <SpcialityMenu />
        <TopDoctors />
        <Banner />
    </div>
  )
}

export default Home