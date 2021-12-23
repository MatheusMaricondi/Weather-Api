import React, { useContext, useEffect, useState } from "react";
import StateContext from '../../context/state'
import { useMessages } from "../../services/messages";
import { dataConstants } from '../../constants/data'
import styles from './styles.module.scss'
import { GoogleCharts } from 'google-charts';
import { Card, Tabs, Radio } from "antd";


const Forecast = () => {
    const [forecastData, setForecastData] = useState([])
    const [forecastDay, setForecastDay] = useState(0)
    const messages = useMessages()
    const { generalState, weatherState } = useContext(StateContext)
    const { dayHours } = dataConstants
    const { language } = generalState
    const { TabPane } = Tabs
    const tabs = [
        {
            id: messages.get('forecast.tab.temp'),
            activeKey: 'chart_temp',
        },
        {
            id: messages.get('forecast.tab.rain'),
            activeKey: 'chart_rain',
        },
        {
            id: messages.get('forecast.tab.wind'),
            activeKey: 'chart_wind',
        }
    ];


    useEffect(() => {
        if (!generalState.loading) {
            normalizeData()
        }
    }, [generalState.loading])

    useEffect(() => {
        if (forecastData.length > 0) {
            console.log(forecastData)
            GoogleCharts.load(drawChart)
        }
    }, [generalState.loading, generalState.language, generalState.searchCity, forecastData, forecastDay])

    const normalizeData = () => {

        const br_lang = 'pt-BR'

        let allForecastDay = []
        let forecastDay = {}

        weatherState?.forecast?.forecastday.map(forecast => {
            forecastDay = {
                icon: forecast.day.condition.icon,
                text: forecast.day.condition.text,
                date: forecast.date,
                hours: [],
                day: {
                    condition: {
                        icon: forecast.day.condition.icon,
                        text: forecast.day.condition.text
                    },
                    maxtemp: language === br_lang ? `${forecast.day.maxtemp_c} ºC` : `${forecast.day.maxtemp_f} ºF`,
                    mintemp: language === br_lang ? `${forecast.day.mintemp_c} ºC` : `${forecast.day.mintemp_f} ºF`
                }
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

        forecastData[forecastDay].hours.forEach(hour => {
            dataRowsTemp.push([hour.datatime, hour.temp])
            dataRowsRain.push([hour.datatime, hour.rain])
            dataRowsWind.push([hour.datatime, hour.wind])
        })

        const Rows = [
            { dataTable: dataRowsTemp, text: 'forecast.tab.temp', color: '#a30006', divName: 'chart_temp' },
            { dataTable: dataRowsRain, text: 'forecast.tab.rain', color: '#457d97', divName: 'chart_rain' },
            { dataTable: dataRowsWind, text: 'forecast.tab.wind', color: '#96d7eb', divName: 'chart_wind' }
        ]

        const googleArrayToDataTable = rowData => GoogleCharts.api.visualization.arrayToDataTable(rowData)

        const googleOptions = opt => ({
            title: messages.get(opt.text),
            curveType: 'function',
            legend: { position: 'right' },
            colors: [opt.color],
            animation: {
                duration: 1000,
                startup: true
            },
        })

        Rows.forEach(row => {
            const { dataTable, text, color, divName } = row
            let area_chart = new GoogleCharts.api.visualization.LineChart(document.getElementById(divName));
            area_chart.draw(googleArrayToDataTable(dataTable), googleOptions({ text, color }))
        })
    }

    function handleChangeParam() {
        GoogleCharts.load(drawChart)
    }

    function handleChangeDay(ev) {
        setForecastDay(ev.target.value)
    }
    return (
        <div className={styles.tab_container}>
            <Card
                title={messages.get('weather.forecast.title')}
                loading={generalState.loading}
            >
                <Tabs onChange={handleChangeParam} defaultActiveKey="chart_temp">
                    {tabs.map((tab, idx) => (
                        <TabPane forceRender tab={tab.id} key={idx}>
                            <div style={{ height: '300px', width: '100%' }} id={tab.activeKey}> </div>
                        </TabPane>
                    ))}
                </Tabs>
            </Card>
            <Radio.Group onChange={ev => handleChangeDay(ev)} defaultValue={forecastDay} buttonStyle="solid">
                {forecastData.map((it, idx) => (<Radio style={{ heigth: '200px', width: '100px' }} type="default" value={idx} key={idx}>
                    <div>
                        <div>{it.date}</div>
                        <img src={it.day.condition.icon} />
                        <div>{it.day.maxtemp} {it.day.mintemp}</div>
                    </div>
                </Radio>
                ))}
            </Radio.Group>
        </div>
    )
}

export default Forecast