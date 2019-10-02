import { createStore, combineReducers, applyMiddleware } from 'redux'
import { colors, sort, selected, colortypes } from './reducers/colorsReducer'
import { books, selectedbook } from './reducers/booksReducer'
import { weather } from './reducers/weatherReducer'
import { curForm, isIns } from './reducers/reducers'
import stateData from './data/initialState'

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

const saver = store => next => action => {
    let result = next(action)
    //window.localStorage.clear()
    //при след запуске, данные загружаются их localstorage, а не с бд
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return result
}


//console.log(stateData)


const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({colors, sort, selected, colortypes, books, selectedbook, curForm, isIns, weather}),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            initialState
    )


    
export default storeFactory
