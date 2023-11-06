import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderInfoQuery } from '../../../../Redux/api/baseApi';
import LinkBanner from '../../../../Components/Common/LinkBanner';
import OrderdetailsTable from '../../../../Components/Common/OrderdetailsTable';
import { Helmet } from 'react-helmet';

const PreviousOrders = () => {



    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)

    const { data, isSuccess, error } = useGetOrderInfoQuery(!userLoading && userEmail)

    //console.log(data, error, 'orderinfo')
    return (
        <>
              <Helmet><title>Food-Corner | Previous Orders</title></Helmet>
        {
            userLoading ? <></> :
                <div className=''>
                    <LinkBanner text='Pevious Orders'></LinkBanner>

                    <OrderdetailsTable isComplete={true} data={data?.result1} userEmail={userEmail} isAdmin={false}></OrderdetailsTable>

                </div>
        }</>
    );
};

export default PreviousOrders;