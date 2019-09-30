import C from '../actions/constants'




export const book = (state = {}, action) => {
    
    switch (action.type) {
        case C.ADD_BOOK:
            return {
                isbn: action.isbn,
                title: action.title,
                author: action.author,
                price: action.price,
                dt_published: action.dt_published,
                id: action.id          
            }
        case C.EDIT_BOOK:
            return (state.id !== action.id) ?
                state :
                {
                    isbn: action.isbn,
                    title: action.title,
                    author: action.author,
                    price: action.price,
                    dt_published: action.dt_published,
                    id: action.id
                }
        default :
            return state
    }
}

export const books = (state = [], action) => {
    
    switch (action.type) {
        case C.ADD_BOOK :
            return [
                ...state,
                book({}, action)
            ]
        case C.EDIT_BOOK :
            return state.map(
                c => book(c, action)
            )
        case C.REMOVE_BOOK :
            return state.filter(
                c => c.id !== action.id
            )
        case C.LOAD_BOOKS :
            return action.jsonBooks            
        default:
            return state
    }
}



export const sortBook = (state = "SORTED_BY_DATE", action) => {
    switch (action.type) {
        case C.SORT_BOOKS:
            return action.sortBy
        default :
            return state
    }
}

export const selectedbook = (state = {}, action) => {
    switch (action.type) {
        case C.EDIT_SELECTED_BOOK:
        return {
            isbn: action.isbn,
            title: action.title,
            author: action.author,
            price: action.price,
            dt_published: action.dt_published,
            id: action.id
        }
        default :
            return state
    }
}