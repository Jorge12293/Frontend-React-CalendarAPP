import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from '../auth';
import { CalendarPage } from "../calendar";


export const AppRouter = () => {
    const authStatus: string = 'not-authenticated-3'; // authenticated
    return (
        <Routes>
            {
                (authStatus === 'not-authenticated')
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login"/>} />
        </Routes>
    )
}

