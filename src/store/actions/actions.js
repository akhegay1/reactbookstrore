import C from './constants'



export const loadWeather = (jsonWeather) =>
({
    type: C.LOAD_WEATHER,
    jsonWeather
})

export const setCurForm = (curForm) =>
    ({
        type: C.SET_CURFORM,
        curForm
    })

export const setIsIns = (isIns) =>
    ({
        type: C.SET_IS_INS,
        isIns
    })
    

