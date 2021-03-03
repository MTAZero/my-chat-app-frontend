import Axios from "axios";
import { getSessionKey } from "../helper/storageHelper";
import https from "https";
import { AppConfigs } from "../../configs";

let server = AppConfigs.ServerConfigs.server

const _makeRequest = (instantAxios) => async (args) => {
    const _headers = args.headers ? args.headers : {};
    const body = args.body ? args.body : {};
    const defaultHeaders = {};
    args = {
        ...args,
        headers: {
            ...defaultHeaders,
            ..._headers,
        },
        body,
    };

    const request = instantAxios(args);

    return request
        .then((response) => response.data)
        .catch((error) => {
            throw error.response.data ? error.response.data : error.response
        });
};

const _makeAuthRequest = (instantAxios) => async (args) => {
    const requestHeaders = args.headers ? args.headers : {};
    const accessToken = getSessionKey();

    let headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    args = {
        ...args,
        headers: {
            ...requestHeaders,
            ...headers,
        },
    };

    const request = instantAxios(args);

    return request
        .then((response) => response.data)
        .catch((error) => {
            throw {
                message: error.response.data ? error.response.data : error.response,
            };
        });
};

export default (options = {}) => {
    let BaseURL = server;

    if (options.BaseURL) BaseURL = options.BaseURL;

    //const baseUrlValidated = options.baseUrl || getEnv('baseAPIUrl')
    const instance = Axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
        baseURL: BaseURL,
        timeout: 30000,
    });

    return {
        makeRequest: _makeRequest(instance),
        makeAuthRequest: _makeAuthRequest(instance),
    };
};
