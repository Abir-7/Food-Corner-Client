import React from 'react';
import { useGetUserQuery } from '../../../Redux/api/baseApi';

const ManageUser = () => {

    const { data, isError, error, isLoading } = useGetUserQuery()

    console.log(data,error)
    return (
        <div className='flex justify-center items-center '>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
        
                    {
                        data?.map((user,index)=><tr>
                        <td key={index}>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={user?.image} alt="Avatar Tailwind CSS Component" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{user?.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                        {user?.email}
                        </td>
                        <td>{user?.role}</td>
                        <th>
                          <button className="btn btn-ghost btn-xs">Delete</button>
                        </th>
                      </tr>)
                    }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;