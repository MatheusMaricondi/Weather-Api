import conditionType from './conditionTypes'

type forecastDayType = {

}
type forecastHourType = {

}
type forecastArrayType = {
    date?: Date,
    day?: forecastDayType,
    hour?: forecastHourType[]
}

type forecastType = {
    data?: forecastArrayType[],
    render?: boolean
}

export default forecastType