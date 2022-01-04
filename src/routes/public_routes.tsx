import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../components/header/Header'
import Weather from '../pages/weather/Weather'

const RoutesPage = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Weather />} />
            </Routes>
        </div>
    </BrowserRouter>
)

export default RoutesPage