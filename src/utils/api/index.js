import { Auth, Messages } from './services'

const APIServices = {
    Auth,
    Messages
}

export const useAPI = () => {
    return APIServices
}

export default APIServices