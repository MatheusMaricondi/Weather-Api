import React, { useState } from "react";
import styles from './styles.module.scss'
import { Menu, Button } from "antd"
import { BiCurrentLocation } from 'react-icons/bi'


const Header = () => {
    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="horizontal"
                inlineCollapsed={collapsed}
            >
                <Menu.Item disabled>
                    <div className={styles.img_content}>
                        <a href="https://www.weatherapi.com/" title="Free Weather API">
                            <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" />
                        </a>
                    </div>
                </Menu.Item>
                <Menu.Item key="1">
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10px' }}>
                        <div style={{ padding: '8px 5px 0 0', }}>
                            <BiCurrentLocation size={25} />
                        </div>
                        <div style={{ paddingRight: '5px' }}>
                            Location
                        </div>
                    </div>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Header