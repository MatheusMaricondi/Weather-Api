import React, { useContext, useEffect, useState } from "react";
import StateContext from '../../../context/state'
import styles from './styles.module.scss'
import { useMessages } from "../../../services/messages";
import { GoogleCharts } from 'google-charts';
import { dataConstants } from '../../../constants/data'
import { Card } from "antd";


const Forecast = () => {
    const [forecastData, setForecastData] = useState([])
    const messages = useMessages()
    const { forecastState, generalState } = useContext(StateContext)
    const { dayHours } = dataConstants


    useEffect(() => {
        if (forecastState.render) {
            normalizeData()
        }
    }, [forecastState.render])

    useEffect(() => {
        if (forecastData.length > 0) {
            GoogleCharts.load(drawChart)
        }
    }, [generalState.loading, generalState.language])

    const normalizeData = () => {
        const { language } = generalState
        const br_lang = 'pt-BR'

        let allForecastDay = []
        let forecastDay = {}
        forecastState.data.forecastday.map(forecast => {
            forecastDay = {
                icon: forecast.day.condition.icon,
                text: forecast.day.condition.text,
                hours: []
            }
            forecast.hour.map(date => {
                const onlyHour = date.time.split(' ')[1]
                if (dayHours.includes(onlyHour)) {
                    forecastDay.hours.push({
                        datatime: date.time,
                        temp: language === br_lang ? date.temp_c : date.temp_f,
                        rain: language === br_lang ? date.precip_mm : date.precip_in,
                        wind: language === br_lang ? date.wind_kph : date.wind_mph,
                        conditions: {
                            icon: date.condition.icon,
                            text: date.condition.text
                        }
                    })
                }
            })
            allForecastDay.push(forecastDay)
        })
        setForecastData(allForecastDay)
    }

    function drawChart() {
        let dataRows = [[messages.get('forecast.tab.datetime'), messages.get('forecast.tab.temp'), messages.get('forecast.tab.rain'), messages.get('forecast.tab.wind')]]

        forecastData[0].hours.forEach(hour => {
            console.log(hour)
            dataRows.push([hour.datatime, hour.temp, hour.rain, hour.wind])
        })
        let data = GoogleCharts.api.visualization.arrayToDataTable(dataRows)

        const options = {
            title: '',
            curveType: 'function',
            legend: { position: 'right' },
            colors: ['#a30006', '#457d97', '#96d7eb'],
            animation: {
                duration: 1000,
                startup: true
            },
        };

        const area_temp_chart = new GoogleCharts.api.visualization.AreaChart(document.getElementById("chart"));
        area_temp_chart.draw(data, options);
    }


    return (
        <div className={styles.tab_container}>
            <Card
                title={messages.get('weather.forecast.title')}
                loading={generalState.loading}
            >
                <div style={{ height: '500px' }} id='chart'></div>
            </Card>
        </div>
    )
}

export default Forecast