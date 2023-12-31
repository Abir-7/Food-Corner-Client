import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderInfoQuery } from '../../../Redux/api/baseApi';
import OrderdetailsTable from '../../../Components/Common/OrderdetailsTable';
import LinkBanner from '../../../Components/Common/LinkBanner';
import { Helmet } from 'react-helmet';

const PendingOrders = () => {
    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)

    const { data, isSuccess, error } = useGetOrderInfoQuery(!userLoading && userEmail)
    console.log(data)
    return (
        <div className=''>
                  <Helmet><title>Food-Corner | Pending Orders</title></Helmet>
            <LinkBanner text='Pending Orders'></LinkBanner>
            <div>
                <div className="">
                    <OrderdetailsTable data={data?.result} isAdmin={false}></OrderdetailsTable>
                </div>
            </div>
        </div>
    );
};

export default PendingOrders;