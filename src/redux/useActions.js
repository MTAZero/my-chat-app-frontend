import { AuthActions } from './auth/actions'
import { RealtimeActions } from './realtime/actions'

export const useActions = () => {
    const actions = {
        AuthActions,
        RealtimeActions
    }

    return actions
}