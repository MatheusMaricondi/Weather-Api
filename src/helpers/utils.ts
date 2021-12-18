import React from "react"

const changeLanguageString = (value: string) => {
    const result = value.split('-')
    return result[0]
}

export { changeLanguageString }