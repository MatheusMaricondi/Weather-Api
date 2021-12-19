import React, { useContext, FC } from "react";
import StateContext from '../../../context/state'
import styles from './styles.module.scss'
import { useMessages } from "../../../services/messages";
import { GoogleCharts } from 'google-charts';
import { Tabs, Card } from "antd";


const Forecast = () => {
    const { TabPane } = Tabs
    const messages = useMessages()
    // const { state, setState } = useContext(StateContext)

    GoogleCharts.load(drawChart)


    const normalizeData = () => {
        console.log()

    }

    function drawChart() {
        normalizeData()
        const data = GoogleCharts.api.visualization.arrayToDataTable([
            ['Temperature', 'Amount'],
            ['Lorem ipsum', 60],
            ['Dolor sit', 22],
            ['Sit amet', 18]
        ]);
        const pie_1_chart = new GoogleCharts.api.visualization.AreaChart(document.getElementById('chart_temp'));
        pie_1_chart.draw(data);
    }

    return (
        <div className={styles.tab_container}>
            <Card
                title={messages.get('weather.forecast.title')}
            >
                <Tabs defaultActiveKey="1" onChange={() => { }}>
                    <TabPane tab={messages.get('forecast.tab.temp')} key="1">
                        <div id='chart_temp'></div>
                    </TabPane>
                    <TabPane tab={messages.get('forecast.tab.rain')} key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab={messages.get('forecast.tab.wind')} key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}

export default Forecast