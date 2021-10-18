import { getInitialData } from '../utilities/Api'
import { receiveQuestions } from './Question'
import { receiveUsers } from './Users'
import { setAuthedUser } from './AuthedUser'

const AUTHED_ID = "No_Active_user"

export function handleInitialData () {
    return (dispatch) => {
      return getInitialData()
        .then(({ users, questions }) => {
          dispatch(receiveUsers(users))
          dispatch(receiveQuestions(questions))
          dispatch(setAuthedUser(AUTHED_ID))
        })
    }
  }