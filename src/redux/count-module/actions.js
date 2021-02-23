const prefix = 'count_module/'

const type = {
    INC_COUNT: prefix + 'inc_count',
    DEC_COUNT: prefix + 'dec_count'
}

const action = {
    incCount: (number = 1)  => {
        return {
            type: type.INC_COUNT,
            payload: {
                number
            }
        }
    },
    decCount: (number = 1) => {
        return {
            type: type.DEC_COUNT,
            payload: {
                number
            }
        }
    }
}

export default {
    type,
    action
}