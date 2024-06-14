import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Contatos from '../contatos';
import { Private } from './Private';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/register' element={<SignUp/>}/>

            <Route path='/contatos' element={<Private> <Contatos/> </Private> }/>
        </Routes>
    )
}

export default RoutesApp;