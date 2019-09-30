import C from '../actions/constants'



export const curForm = (state = {}, action) => {
    switch (action.type) {
        case C.SET_CURFORM:
        return {
            formName: action.curForm
        }              
        default :
            return state
    }
}

export const isIns = (state = {}, action) => {
    switch (action.type) {
        case C.SET_IS_INS:
        return {
            ent: action.isIns
        }              
        default :
            return state
    }
}

