import C from './constants'
import { v4 } from 'uuid'


export const addColor = (title, color, rating, timestamp, colortype) =>
({
    type: C.ADD_COLOR,
    id: v4(),
    title,
    color,
    rating,
    timestamp: new Date().toString(),
    colortype,   
})

export const removeColor = id =>
({
    type: C.REMOVE_COLOR,
    id
})

export const rateColor = (id, rating) =>
({
    type: C.RATE_COLOR,
    id,
    rating
})


export const editSelected = (id, title, color, rating, timestamp, colortype) =>
({
    type: C.EDIT_SELECTED,
    id,
    title,
    color,
    rating,
    timestamp,
    colortype
})

export const editColor = (id, title, color, rating, timestamp, colortype) =>
({
    type: C.EDIT_COLOR,
    id,
    title,
    color,
    rating,
    timestamp,
    colortype
})



export const sortColors = sortedBy =>
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