import { store } from './store'
import AuthActions from './auth/actions'

export default () =>
    new Promise(
        () => {
            store.dispatch(AuthActions.action.checkSession())
        }
    )
