import React from 'react';
import MainCard from 'components/MainCard';
import { Outlet } from 'react-router-dom';
const index = () => {
    return (
        <MainCard title="Inventory">
           <Outlet/>
       </MainCard>
    )
}

export default index