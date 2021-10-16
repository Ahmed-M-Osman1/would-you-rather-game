import { combineReducers } from 'redux'
import authedUser from './AuthedUser'
import users from './Users'
import questions from './Question'

export default combineReducers({
    authedUser,
    users,
    questions
})