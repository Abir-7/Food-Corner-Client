import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderInfoQuery } from '../../../../Redux/api/baseApi';
import LinkBanner from '../../../../Components/Common/LinkBanner';
import OrderdetailsTable from '../../../../Components/Common/OrderdetailsTable';

const PreviousOrders = () => {



    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)

    const { data, isSuccess, error } = useGetOrderInfoQuery(!userLoading && userEmail)

    //console.log(data, error, 'orderinfo')
    return (
       <>{
        userLoading?<></>:
        <div className=''>
        <LinkBanner text='Pevious Orders'></LinkBanner>
        <div>
            <div className="overflow-x-auto">
                <OrderdetailsTable isComplete={true} data={data?.result1} userEmail={userEmail} isAdmin={false}></OrderdetailsTable>
            </div>
        </div>
    </div>
       }</>
    );
};

export default PreviousOrders;