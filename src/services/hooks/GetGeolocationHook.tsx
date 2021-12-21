import React, { useContext } from 'react'
import StateContext from '../../context/state'

const GetGeolocationHook = () => {
    const { setGeoState, geoState } = useContext(StateContext)

    const getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(local => {
            setGeoState({
                lat: local.coords.latitude,
                lng: local.coords.longitude,
                render: !geoState.render
            })
        })
    }

    return { getGeolocation }
}

export default GetGeolocationHook