import { getSessionKey } from '../../utils/helper';
import actions from './actions';

const initState = {
    // messages: 
    // [
    //     {
    //         _id: '603d08933777960c16b65962',
    //         user: {
    //             _id: '602d5f02e96777d73a417eb0',
    //             fullname: 'Bùi Quốc Hưng',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: 'Kafa',
    //         timestamp: 1614612627716,
    //         __v: 0,
    //         from: 'Bùi Quốc Hưng',
    //     },
    //     {
    //         _id: '603d07e43777960c16b65961',
    //         user: {
    //             _id: '602d5f02e96777d73a417eb0',
    //             fullname: 'Bùi Quốc Hưng',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: '\nTest lại',
    //         timestamp: 1614612452170,
    //         __v: 0,
    //         from: 'Bùi Quốc Hưng',
    //     },
    //     {
    //         _id: '603d06ad3777960c16b65960',
    //         user: {
    //             _id: '602d5f02e96777d73a417eb0',
    //             fullname: 'Bùi Quốc Hưng',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: 'hala',
    //         timestamp: 1614612141123,
    //         __v: 0,
    //         from: 'Bùi Quốc Hưng',
    //     },
    //     {
    //         _id: '603d06a53777960c16b6595f',
    //         user: {
    //             _id: '602cddbc09fcb5d167d89940',
    //             fullname: 'Bùi Xuân Thuỷ',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: '=))',
    //         timestamp: 1614612133423,
    //         __v: 0,
    //         from: 'Bùi Xuân Thuỷ',
    //     },
    //     {
    //         _id: '603d06973777960c16b6595e',
    //         user: {
    //             _id: '602cddbc09fcb5d167d89940',
    //             fullname: 'Bùi Xuân Thuỷ',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: 'hello',
    //         timestamp: 1614612119553,
    //         __v: 0,
    //         from: 'Bùi Xuân Thuỷ',
    //     },
    //     {
    //         _id: '603c9a143777960c16b6595d',
    //         user: {
    //             _id: '602d4b158f65f7d48abd9c01',
    //             fullname: 'Chu Phương Nam',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: ':D',
    //         timestamp: 1614584340903,
    //         __v: 0,
    //         from: 'Chu Phương Nam',
    //     },
    //     {
    //         _id: '603c9a113777960c16b6595c',
    //         user: {
    //             _id: '602d4b158f65f7d48abd9c01',
    //             fullname: 'Chu Phương Nam',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: 'realtime rồi chứ nhỉ',
    //         timestamp: 1614584337822,
    //         __v: 0,
    //         from: 'Chu Phương Nam',
    //     },
    //     {
    //         _id: '603c9a0c3777960c16b6595b',
    //         user: {
    //             _id: '602d4b158f65f7d48abd9c01',
    //             fullname: 'Chu Phương Nam',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: 'hello :v ',
    //         timestamp: 1614584332318,
    //         __v: 0,
    //         from: 'Chu Phương Nam',
    //     },
    //     {
    //         _id: '603c9a063777960c16b6595a',
    //         user: {
    //             _id: '602d4b158f65f7d48abd9c01',
    //             fullname: 'Chu Phương Nam',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: '=))',
    //         timestamp: 1614584326361,
    //         __v: 0,
    //         from: 'Chu Phương Nam',
    //     },
    //     {
    //         _id: '603c9a043777960c16b65959',
    //         user: {
    //             _id: '602d4b158f65f7d48abd9c01',
    //             fullname: 'Chu Phương Nam',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: 'chào cc ',
    //         timestamp: 1614584324035,
    //         __v: 0,
    //         from: 'Chu Phương Nam',
    //     },
    //     {
    //         _id: '603c99fe3777960c16b65958',
    //         user: {
    //             _id: '602cddbc09fcb5d167d89940',
    //             fullname: 'Bùi Xuân Thuỷ',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: 'Xin chào tất cả các anh em :D ',
    //         timestamp: 1614584318973,
    //         __v: 0,
    //         from: 'Bùi Xuân Thuỷ',
    //     },
    //     {
    //         _id: '603c99eb3777960c16b65957',
    //         user: {
    //             _id: '602cddbc09fcb5d167d89940',
    //             fullname: 'Bùi Xuân Thuỷ',
    //             avatar:
    //                 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg',
    //         },
    //         content: ':D ',
    //         timestamp: 1614584299141,
    //         __v: 0,
    //         from: 'Bùi Xuân Thuỷ',
    //     },
    // ],
    messages: []
};

const reducers = (state = initState, action) => {
    switch (action.type) {
        case actions.type.CONNECT:
            return state;

        case actions.type.DISCONNECT:
            return state;

        case actions.type.SEND_MESSAGE:
            return state;

        case actions.type.SET_LIST_MESSAGE:
            return {
                ...state,
                ...{
                    messages: action.payload.messages,
                },
            };

        case actions.type.PUSH_MESSAGE:
            return {
                ...state,
                ...{
                    messages: [...state.messages, action.payload.message],
                },
            };

        default:
            return state;
    }
};

export default reducers;
