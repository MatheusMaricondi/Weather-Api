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
    const { language } = generalState

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

        const br_lang = 'pt-BR'
        const temp_l = language === br_lang ? 'ºC' : 'ºF'
        const rain_l = language == br_lang ? 'mm' : 'in'
        const wind_l = language === br_lang ? 'k/h' : 'm/s'


        let dataRowsTemp = [[messages.get('forecast.tab.datetime'), `${messages.get('forecast.tab.temp')} - ${temp_l}`]]
        let dataRowsRain = [[messages.get('forecast.tab.datetime'), `${messages.get('forecast.tab.rain')} - ${rain_l}`]]
        let dataRowsWind = [[messages.get('forecast.tab.datetime'), `${messages.get('forecast.tab.wind')} - ${wind_l}`]]

        forecastData[0].hours.forEach(hour => {
            dataRowsTemp.push([hour.datatime, hour.temp])
            dataRowsRain.push([hour.datatime, hour.rain])
            dataRowsWind.push([hour.datatime, hour.wind])
        })
        let dataTemp = GoogleCharts.api.visualization.arrayToDataTable(dataRowsTemp)
        let dataRain = GoogleCharts.api.visualization.arrayToDataTable(dataRowsRain)
        let dataWind = GoogleCharts.api.visualization.arrayToDataTable(dataRowsWind)

        const optionsTemp = {
            title: messages.get('forecast.tab.temp'),
            curveType: 'function',
            legend: { position: 'right' },
            colors: ['#a30006'],
            animation: {
                duration: 1000,
                startup: true
            },
        };
        const optionsRain = {
            title: messages.get('forecast.tab.rain'),
            curveType: 'function',
            legend: { position: 'right' },
            colors: ['#457d97'],
            animation: {
                duration: 1000,
                startup: true
            },
        };
        const optionsWind = {
            title: messages.get('forecast.tab.wind'),
            curveType: 'function',
            legend: { position: 'right' },
            colors: ['#96d7eb'],
            animation: {
                duration: 1000,
                startup: true
            },
        };

        const area_temp_chart = new GoogleCharts.api.visualization.LineChart(document.getElementById("chart_temp"));
        const area_rain_chart = new GoogleCharts.api.visualization.LineChart(document.getElementById("chart_rain"));
        const area_wind_chart = new GoogleCharts.api.visualization.LineChart(document.getElementById("chart_wind"));

        area_temp_chart.draw(dataTemp, optionsTemp);
        area_rain_chart.draw(dataRain, optionsRain);
        area_wind_chart.draw(dataWind, optionsWind);
    }


    return (
        <div className={styles.tab_container}>
            <Card
                title={messages.get('weather.forecast.title')}
                loading={generalState.loading}
            >
                <div style={{ height: '300px', width: '100%' }} id='chart_temp'></div>
                <div style={{ height: '300px' }} id='chart_rain'></div>
                <div style={{ height: '300px' }} id='chart_wind'></div>
            </Card>
        </div>
    )
}

export default Forecast