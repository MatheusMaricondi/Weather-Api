import React, { useContext, useEffect, useState } from "react";
import StateContext from '../../context/state'
import { useMessages } from "../../services/messages";
import { dataConstants } from '../../constants/data'
import styles from './styles.module.scss'
import { GoogleCharts } from 'google-charts';
import { Card, Tabs, Radio, Space } from "antd";


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
        if (forecastData.length) {
            GoogleCharts.load(drawChart)
        }
    }, [generalState.searchCity, forecastDay, forecastData])

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
            dataRowsTemp.push([hour.datatime.split(' ')[1], hour.temp])
            dataRowsRain.push([hour.datatime.split(' ')[1], hour.rain])
            dataRowsWind.push([hour.datatime.split(' ')[1], hour.wind])
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

    function getDayName(dateStr) {
        const locale = 'en-US'
        const date = new Date(`${dateStr} 00:00`);
        const longWeek = date.toLocaleDateString(locale, { weekday: 'long' }).toLowerCase()
        return messages.get(`common.week.${longWeek}`)
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
                            <div className={styles.forecast_tab_subtitle_conteiner}>
                                <div className={styles.forecast_tab_desc}>{messages.get('forecast.chart.subtitle')}:</div>
                                <div className={styles.forecast_tab_subtitle}>{forecastData.length > 0 && forecastData[forecastDay].day.condition.text}</div>
                                <div className={styles.forecast_tab_type}>[ {messages.get('forecast.chart.type')} ]</div>
                            </div>
                            <div style={{ height: '300px', width: '100%' }} id={tab.activeKey}> </div>
                        </TabPane>
                    ))}
                </Tabs>
            </Card>
            <Space align="center">
                <Radio.Group onChange={ev => handleChangeDay(ev)} defaultValue={forecastDay} buttonStyle="outline" className={styles.forecast_days_container}>
                    {forecastData.map((it, idx) => (
                        <Radio.Button value={idx} key={idx}>
                            {getDayName(it.date)}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Space>
        </div >
    )
}

export default Forecast