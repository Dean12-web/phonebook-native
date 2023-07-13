import {combineReducers} from 'redux'
import users from './users'
import phonebooks from './phonebooks'
import pagination from './pagination'
const rootReducer = combineReducers({
    users,
    phonebooks,
    pagination
})

export default rootReducer