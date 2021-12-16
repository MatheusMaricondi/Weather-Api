import { GoogleApiWrapper, Map, Marker } from 'google-maps-react'
import { apiConstants } from '../../constants/api'
import { useContext } from 'react'
import StateContext from '../../context/state'


const Maps = () => {
    const { state, } = useContext(StateContext)

    return (
        <Map
            style={{ marginLeft: -12, marginTop: -12, width: '100%' }}
            google={google}
            zoom={14}
            initialCenter={{
                lat: state.geoLocation.lat,
                lng: state.geoLocation.lng
            }}
        >
            <Marker onClick={() => { }} >
            </Marker>
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: (apiConstants.api_maps)
})(Maps)

