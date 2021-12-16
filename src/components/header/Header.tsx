import React, { useState } from "react";
import styles from './styles.module.scss'
import { Menu, Button } from "antd"
import { BiCurrentLocation } from 'react-icons/bi'


const Header = () => {

    return (
        <div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="horizontal"
            >
                <Menu.Item disabled>
                    <div className={styles.img_content}>
                        <a href="https://www.weatherapi.com/" title="Free Weather API">
                            <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" />
                        </a>
                    </div>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Header