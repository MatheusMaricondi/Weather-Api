import React from 'react'

const DEFAULT_GENERAL_VALUE = {
    loading: false,
    language: navigator.language
}

const DEFAULT_GEO_VALUE = {
    lat: 0,
    lng: 0,
    render: false
}

export const DEFAULT_VALUE = {
    generalState: DEFAULT_GENERAL_VALUE,
    setGeneralState: () => { },
    geoState: DEFAULT_GEO_VALUE,
    setGeoState: () => { }
}

