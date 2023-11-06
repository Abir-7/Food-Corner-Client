import React from 'react';
import { useGetOrderInfoQuery } from '../../../Redux/api/baseApi';
import { useSelector } from 'react-redux';
import OrderdetailsTable from '../../../Components/Common/OrderdetailsTable';
import LinkBanner from '../../../Components/Common/LinkBanner';
import { Helmet } from 'react-helmet';

const CompletedOrderPage = () => {
    
    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError,mobile,address } = useSelector((state) => state.userProfileSlice)

    const { data, isSuccess, error, isLoading } = useGetOrderInfoQuery(!userLoading && userEmail)

    console.log(data)

    return (
        <>
              <Helmet><title>Food-Corner | Completed Orders</title></Helmet>
            {
                userLoading ? <></> : <div>
                    <LinkBanner text='Completed Orders'></LinkBanner>
                    <div>
                        <OrderdetailsTable isComplete={true} data={data?.result1} isAdmin={true} userEmail={userEmail} ></OrderdetailsTable>
                    </div>
                </div>
            }
        </>
    );
};

export default CompletedOrderPage;