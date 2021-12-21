import { currentType, locationType, forecastType } from './index'

type weatherTypes = {
    lat?: number,
    lon?: number,
    timezone?: string,
    current?: currentType,
    location?: locationType,
    forecast?: forecastType
}

export default weatherTypes