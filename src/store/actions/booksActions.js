import C from './constants'



export const loadBooks = (jsonBooks) =>
    ({
        type: C.LOAD_BOOKS,
        jsonBooks
    })



export const addBook = (isbn, title, author, price, dt_published) =>
    ({
        type: C.ADD_BOOK,
        isbn,
        title,
        author,
        price,
        dt_published
    })

export const removeBook = id =>
    ({
        type: C.REMOVE_BOOK,
        id
    })




export const editSelectedBook = (isbn, title, author, price, dt_published, id) =>
    ({
        type: C.EDIT_SELECTED_BOOK,
        isbn,
        title,
        author,
        price,
        dt_published,
        id
    })

export const editBook = (isbn, title, author, price, dt_published, id) =>
    ({
        type: C.EDIT_BOOK,
        isbn,
        title,
        author,
        price,
        dt_published,
        id
    })



export const sortBooks = sortedBy =>
    (sortedBy === "rating") ?
        ({
            type: C.SORT_COLORS,
            sortBy: "SORTED_BY_RATING"
        }) :
        (sortedBy === "title") ?
            ({
                type: C.SORT_COLORS,
                sortBy: "SORTED_BY_TITLE"
            }) :
            ({
                type: C.SORT_COLORS,
                sortBy: "SORTED_BY_DATE"
            })