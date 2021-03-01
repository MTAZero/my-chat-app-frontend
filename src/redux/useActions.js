import { AuthActions } from './auth/actions'
import { RealtimeActions } from './realtime/actions'
import { UIGlobalActions  } from './ui_global/actions'

export const useActions = () => {
    const actions = {
        AuthActions,
        RealtimeActions,
        UIGlobalActions
    }

    return actions
}