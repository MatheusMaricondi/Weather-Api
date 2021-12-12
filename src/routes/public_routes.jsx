import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Weather from '../pages/weather/Weather'
const { loading, changeLoading } = useContext(LoadingProvider)

const RoutesPage = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/weather' element={<Weather loading={loading} />} />
        </Routes>
    </BrowserRouter>
)

export default RoutesPage