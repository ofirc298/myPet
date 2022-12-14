import Contact from '../other/Contact.js';
import Publication from '../Services/Publication.js';
import TableServices from '../Services/TableServices.js';
import SignUp from '../connection/SignUp.js';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePageComp from './HomePage.js';
import LogIn from '../connection/LogIn.js';
import UserProfile from '../profile/UserProfile.js';
import Terms from '../other/Terms.js';
import Header from '../site/Header.js';
import Footer from '../site/Footer.js';
import About from '../other/About';
import FAQs from '../other/FAQs';
import AddPublication from '../Services/AddPublication.js';
import PetBreed from '../Services/PetBreed';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css';
import UserManagement from '../Administration/UserManagement.js';
import AddServices from '../Services/AddServices'
import UserContact from '../Administration/UserContact.js';
import AddPetBreeds from '../Services/AddPetBreeds.js';
import { useEffect } from 'react';
import { getUserLoading } from './../../redux/actions/getAuthActions';


const MainPageComp = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const auth = useSelector(state => state.auth.auth)

    useEffect(() => {
        dispatch(getUserLoading())
    },[dispatch])

    return (
        <>
      {token ? <Header/> : null}
      <ToastContainer autoClose={2000}/>
            <Routes>
                <Route path='/' element={token ? <HomePageComp /> : <Navigate to="/login"/> } />
                <Route path='/sign-up' element={token ? <Navigate to="/"/> : <SignUp />} />
                <Route path='/login' element={token ? <Navigate to="/"/> : <LogIn />} />
                <Route path='/contact' element={token ? <Contact /> : <Navigate to="/login"/>} />
                <Route path='/service' element={token ? <TableServices /> : <Navigate to="/login"/>} />
                <Route path='/my-profile' element={token ? <UserProfile /> : <Navigate to="/login"/>} />
                <Route path='/terms' element={token ? <Terms /> : <Navigate to="/login"/>} />
                <Route path='/About' element={token ? <About /> : <Navigate to="/login"/>} />
                <Route path='/FAQs' element={token ? <FAQs /> : <Navigate to="/login"/>} />
                <Route path='/Adoptions' element={token ? <Publication /> : <Navigate to="/login"/>} />
                <Route path='/AddAdoptions' element={token ? <AddPublication /> : <Navigate to="/login"/>} />
                <Route path='/PetBreed' element={token ? <PetBreed /> : <Navigate to="/login"/>} />
                <Route path='/users' element={token && auth?.admin ? <UserManagement /> : <Navigate to="/"/>} />
                <Route path='/addService' element={token ? <AddServices /> : <Navigate to="/login"/>} />
                <Route path='/userContact' element={token ? <UserContact /> : <Navigate to="/login"/>} />
                <Route path='/AddPetBreed' element={token ? <AddPetBreeds /> : <Navigate to="/login"/>} />
            </Routes>
            { token ? <Footer /> : null}
        </>
    );
}

export default MainPageComp;