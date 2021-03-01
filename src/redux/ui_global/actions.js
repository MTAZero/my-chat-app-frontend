const prefix = 'ui_global/'

const type = {
    UPDATE_SIDEBAR_COLLAPSE: prefix + 'update_collapse'
}

const action = {
    updateSidebarCollapse: (collapse = false) => {
        return {
            type: type.UPDATE_SIDEBAR_COLLAPSE,
            payload: {
                collapse
            }
        }
    }
}

export const UIGlobalActions = action

export default {
    type,
    action
}