import React from 'react'

type generalType = {
    loading: boolean,
    language: string
}

type geoLocationType = {
    lat: number,
    lng: number,
    render: boolean
}

export type {
    generalType,
    geoLocationType
}