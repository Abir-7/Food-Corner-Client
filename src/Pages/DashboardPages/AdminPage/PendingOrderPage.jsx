import React, { useEffect } from 'react';
import LinkBanner from '../../../Components/Common/LinkBanner';
import OrderdetailsTable from '../../../Components/Common/OrderdetailsTable';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderInfoQuery } from '../../../Redux/api/baseApi';

const PendingOrderPage = () => {


    const dispatch = useDispatch()

    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError,mobile,address } = useSelector((state) => state.userProfileSlice)

    const { data, isSuccess, error, isLoading } = useGetOrderInfoQuery(!userLoading && userEmail)
    //console.log(data,mobile,address)
    return (
        <>
            {
                userLoading ? <></> : <div>
                    <LinkBanner text='Pending Orders'></LinkBanner>
                    <div>
                        <OrderdetailsTable data={data?.result} isAdmin={true} userEmail={userEmail}></OrderdetailsTable>
                    </div>
                </div>
            }
        </>
    );
};

export default PendingOrderPage;