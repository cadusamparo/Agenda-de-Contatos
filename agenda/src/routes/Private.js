import { Navigate } from 'react-router-dom'
export function Private({children}) {
    const user = localStorage.getItem('Logado')

    return user ? children : <Navigate to="/"></Navigate>
}