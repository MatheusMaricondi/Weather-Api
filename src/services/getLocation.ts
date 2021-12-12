import { locationResponse } from "../pages/weather/types"

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(local => {
            resolve(local.coords)
        })
    })
}