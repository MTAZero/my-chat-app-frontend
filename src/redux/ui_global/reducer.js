import actions from './actions'

const initState = {
    sidebar_collapse: window.innerWidth > 1300 ? false : true
}

const reducer = (state = initState, action) => {
    switch (action.type){
        case actions.type.UPDATE_SIDEBAR_COLLAPSE:
            return {
                ...state,
                ...{
                    sidebar_collapse: action.payload.collapse
                }
            }

        default:
            return state
    }
}

export default reducer