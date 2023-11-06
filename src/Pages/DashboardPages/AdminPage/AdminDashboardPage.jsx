
import { useSelector } from 'react-redux';
import { useGetAdminQuery, useGetOrderInfoQuery, useGetOrderItemPercentQuery, useGetUserQuery } from '../../../Redux/api/baseApi';
// import { Authcontext } from '../../../AuthProvider/AuthProvider';
// import { useNavigate } from 'react-router-dom';
import { Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, ResponsiveContainer } from 'recharts';
import { HiMiniClipboardDocumentCheck, HiMiniClipboardDocumentList, HiUser, HiUserCircle } from "react-icons/hi2";
import LinkBanner from '../../../Components/Common/LinkBanner';
import { Link } from 'react-router-dom';





const AdminDashboardPage = () => {

    const { userEmail, userLoading, userImage } = useSelector((state) => state.userProfileSlice)

    const { data: datas } = useGetOrderItemPercentQuery()

    const { data, isSuccess, isLoading } = useGetOrderInfoQuery(!userLoading && userEmail)

    const { data: users, isError, error, isLoading: allUsersLoading } = useGetUserQuery()

    console.log(datas)

    const isMobile = window.innerWidth <= 768

    return (
        <>
            <div>
                <LinkBanner text='Admin Dashboard'></LinkBanner>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 w-full shadow">

                    <div className="stat border">
                        <div className="stat-figure text-primary">
                            <span className='text-green-500 text-5xl'> <HiMiniClipboardDocumentCheck /></span>
                        </div>
                        <div className="stat-title hover:text-orange-400 text-gray-700 font-medium"><Link to='/dashboard/completedOrders'>Completed Orders</Link></div>
                        <div className="stat-value text-primary">{data?.result1.length}</div>
                        {/* <div className="stat-desc">21% more than last month</div> */}
                    </div>

                    <div className="stat border">
                        <div className="stat-figure text-secondary">
                            <span className='text-red-500 text-5xl'> <HiMiniClipboardDocumentList /></span>
                        </div>
                        <div className="stat-title text-gray-700 font-medium hover:text-orange-400"><Link to='/dashboard/pendingOrders'>Pending Orders</Link></div>
                        <div className="stat-value text-secondary">{data?.result.length}</div>
                        {/* <div className="stat-desc">21% more than last month</div> */}
                    </div>

                    <div className="stat border">
                        <div className="stat-figure text-secondary">
                            <div className=" ">
                                <div className="w-16 text-5xl  text-green-500 rounded-full">
                                    <HiUserCircle />
                                </div>
                            </div>
                        </div>
                        <div className="stat-value">{users?.length}</div>
                        <div className="stat-title font-semibold text-gray-700">Users</div>

                    </div>

                </div>
            </div>
            <h1 className='text-orange-500 mt-10 text-center text-lg font-semibold'>Top 10 Orderd Item</h1>

        
            <ResponsiveContainer width="100%" height={isMobile ? 500 : 300}>
      <BarChart
        data={datas}
        layout={isMobile ? 'vertical' : 'horizontal'}
        margin={{
          top: 5,
          right: 30,
          left: 35,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {isMobile ? (
          <>
            <XAxis  type="number" />
            <YAxis dataKey="name" type="category" />
          </>
        ) : (
          <>
            <XAxis dataKey="name" />
            <YAxis />
          </>
        )}
        <Tooltip />
        <Legend  />
        <Bar dataKey="percent" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>






        </>


    );
};

export default AdminDashboardPage;