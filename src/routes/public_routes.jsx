import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Weather from '../pages/weather/Weather'

const RoutesPage = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/weather' element={<Weather />} />
        </Routes>
    </BrowserRouter>
)

export default RoutesPage