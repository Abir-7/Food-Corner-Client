

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Authcontext } from "../AuthProvider/AuthProvider";
import { useGetAdminQuery } from "../Redux/api/baseApi";



const useAdmin = (email) => {
   
    // use axios secure with react query
    // const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
    //     queryKey: ['isAdmin', user?.email],
    //     queryFn: async () => {
    //         console.log('std')
    //         const res = await fetch(`/users/admin/${user?.email}`);
    //         return res.data.admin;
    //     }
    // })

    const {data:isAdmin,isLoading:isAdminLoading}=useGetAdminQuery(email)

    return [isAdmin, isAdminLoading]
}
export default useAdmin;