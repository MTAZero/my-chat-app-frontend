import actions from './actions'

const initState = {
    count: 256
}

const reducer = (state = initState, action) => {
    console.log("actions : ", action)

    switch (action.type){
        case actions.type.INC_COUNT:
            return {
                ...state,
                ...{
                    count: state.count + action.payload.number
                }
            }

        case actions.type.DEC_COUNT:
            return {
                ...state,
                ...{
                    count: state.count - action.payload.number
                }
            }

        default:
            return state 
    }
}

export default reducer