
import { useSelector } from 'react-redux';
import { useGetAdminQuery } from '../../../Redux/api/baseApi';
// import { Authcontext } from '../../../AuthProvider/AuthProvider';
// import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {

    const {userEmail,userLoading, userImage}=useSelector((state)=>state. userProfileSlice)
    const { data: isAdmin, isLoading: isAdminLoading,error } = useGetAdminQuery(userEmail)


    return (
        <div>
            admin dashboard
        </div>
    );
};

export default AdminDashboardPage;