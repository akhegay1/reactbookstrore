import C from '../actions/constants'



export const weather = (state = [], action) => {
    
    switch (action.type) {
        case C.LOAD_WEATHER :
            return action.jsonWeather            
        default:
            return state
    }
}