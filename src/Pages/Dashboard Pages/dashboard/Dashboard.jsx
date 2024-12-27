import React from 'react'
import './dashboard.css'
import Header from '../../../Components/Admin Components/header/Header'
import SideNav from '../../../Components/Admin Components/sideNav/SideNav'
import MainView from '../../../Components/Admin Components/mainView/MainView'
const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className="page-body-wrapper">
            <SideNav />
            <MainView />
            </div>
        </div>
    )
}

export default Dashboard