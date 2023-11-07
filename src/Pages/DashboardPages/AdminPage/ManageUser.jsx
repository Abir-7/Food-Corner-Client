import React from 'react';
import { useGetUserQuery } from '../../../Redux/api/baseApi';
import LinkBanner from '../../../Components/Common/LinkBanner';
import { Helmet } from 'react-helmet';

const ManageUser = () => {

  const { data, isError, error, isLoading } = useGetUserQuery()

  //console.log(data,error)
  return (


    <div>
      <Helmet><title>Food-Corner | Manage Users</title></Helmet>
      <div className='mb-5'>
        <LinkBanner text={'All Users'}></LinkBanner>
      </div>

      <div>
        {data?.map(user => <div className='card shadow-md p-3 grid-cols-1 grid gap-4 md:grid-cols-3'>

          <div className='flex flex-col '>
            <h1 className='mb-3 text-orange-400'>Name</h1>
            <div className="flex  space-x-5">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={user?.image} alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">{user?.name}</div>
              </div>
            </div>
          </div>

          <div>
            <h1 className='mb-3 text-orange-400'>Email</h1>
            <h1>  {user?.email}</h1>
          </div>
          <div>
            <h1 className='mb-3 text-orange-400'>User Role</h1>
            <h1>{user?.role}</h1>
          </div>

          {/* <div>
            <h1 className='mb-3 text-orange-400'>Action</h1>
            <button className="btn btn-ghost btn-xs">Delete</button>
          </div> */}

        </div>)}
      </div>

    </div>


  );
};

export default ManageUser;