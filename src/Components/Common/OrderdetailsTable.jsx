import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModifyOrderStatusMutation } from '../../Redux/api/baseApi';
import toast, { Toaster } from 'react-hot-toast';

const OrderdetailsTable = ({ isComplete, data, isAdmin, userEmail }) => {
    const [modifyOrderStatus, { data: orderStatus, isSuccess }] = useModifyOrderStatusMutation()

    console.log(data)

    const modifyStatus = (isAdmin, paymentID, email) => {

        if (isAdmin == true) {
            modifyOrderStatus({ status: 'Delivered', paymentID, email })
        }

    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Status Updated')
        }
    }, [isSuccess])

    return (
        <table className="table table-zebra">
            {/* head */} <Toaster />
            <thead>
                <tr className='text-orange-400'>
                    <th>Menu Item</th>
                    <th>Total Price</th>
                    <th>PaymentId/OrderId</th>
                    <th>User</th>
                    <th>Date</th>
                    {isComplete && <>
                        <th>Delevery Date</th>
                    </>}
                    <th>Delivary Status</th>
                
                </tr>
            </thead>
            <tbody>
                {/* row 1 */}
                {
                    data?.map((order, index) => {
                        return <tr className='shadow-md ' key={index}>
                            <td className=''> {
                                order?.cartItem?.map((item, index) => <div className='grid my-2 grid-cols-1' key={index}>
                                    <h1>Name: <span className='text-orange-400'>{item?.name}</span></h1>
                                    <p>Size: <span className='text-orange-400'>{item.size ? `${item.size}"` : ''}</span></p>
                                    <p>Amount: <span className='text-orange-400'>{item?.amount}</span></p>
                                </div>)
                            }</td>
                            <td>{order?.totalPrice} Tk.</td>
                            <td className='text-green-500'>{order?.paymentID}</td>
                            <td>{order?.userEmail}</td>
                            <td>{order?.date} {order?.time}</td>
                            {isComplete && <>
                                <td>{order?.deliveryDate} {order?.deliveryTime}</td>
                    </>}
                            <td>{isAdmin && order.status == 'Pending' ? <button onClick={() => modifyStatus(isAdmin, order?.paymentID, userEmail)} className='btn btn-sm bg-orange-400 hover:bg-orange-500'>{order?.status}</button> : order?.status}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    );
};

export default OrderdetailsTable;