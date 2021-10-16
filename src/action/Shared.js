import { getInitialData } from '../utilities/Api'
import { receiveQuestions } from './Question'
import { receiveUsers } from './Users'
import { showLoading, hideLoading } from 'react-redux-loading'
import { setAuthedUser } from './AuthedUser'

const AUTHED_ID = 'johndoe'

export function handleInitialData () {
    return (dispatch) => {
      dispatch(showLoading())
      return getInitialData()
        .then(({ users, questions }) => {
          dispatch(receiveUsers(users))
          dispatch(receiveQuestions(questions))
          dispatch(setAuthedUser(AUTHED_ID))
          dispatch(hideLoading())
        })
    }
  }