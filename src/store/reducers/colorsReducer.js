import C from '../actions/constants'



export const color = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_COLOR:
            return {
                id: action.id,
                title: action.title,
                color: action.color,
                rating: 0,
                timestamp: action.timestamp,
                colortype: action.colortype              
            }
        case C.RATE_COLOR:
            return (state.id !== action.id) ?
                state :
                {
                    ...state,
                    rating: action.rating
                }
        case C.EDIT_COLOR:
            return (state.id !== action.id) ?
                state :
                {
                    id: action.id,
                    title: action.title,
                    color: action.color,
                    rating: action.rating,
                    timestamp: action.timestamp,
                    colortype: action.colortype
                }
        default :
            return state
    }
}

export const colors = (state = [], action) => {
    switch (action.type) {
        case C.ADD_COLOR :
            return [
                ...state,
                color({}, action)
            ]
        case C.RATE_COLOR :
            return state.map(
                c => color(c, action)
            )
        case C.EDIT_COLOR :
            return state.map(
                c => color(c, action)
            )
        case C.REMOVE_COLOR :
            return state.filter(
                c => c.id !== action.id
            )
        default:
            return state
    }
}

export const colortypes = (state = [], action) => {
        return state
}

export const sort = (state = "SORTED_BY_DATE", action) => {
    switch (action.type) {
        case C.SORT_COLORS:
            return action.sortBy
        default :
            return state
    }
}

export const selected = (state = {}, action) => {
    switch (action.type) {
        case C.EDIT_SELECTED:
        return {
            id: action.id,
            title: action.title,
            color: action.color,
            rating: action.rating,
            timestamp: action.timestamp,
            colortype: action.colortype
        }
        default :
            return state
    }
}