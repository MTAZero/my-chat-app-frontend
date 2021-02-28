import { all, takeEvery, fork, put, select } from 'redux-saga/effects';
import actions from './actions';

// helper
import { NotificationsService, setLocalData } from '../../utils/helper';
import APIServices from '../../utils/api';
import { key_const } from '../../const';
import { RealtimeActions } from '../realtime/actions';

function* saga_Login(action) {
    try {
        const { username, password } = action.payload;

        let LoginResponse = yield APIServices.Auth.login(username, password);

        if (LoginResponse.access_token) {
            let sessionKey = LoginResponse.access_token;
            setLocalData(key_const.session_key, sessionKey);
            const userInfo = LoginResponse.user;

            // login success
            yield put(
                actions.action.updateState({
                    session_key: sessionKey,
                    isLoggedIn: true,
                    isLoading: false,
                    userInfo,
                    current_user_info: userInfo,
                }),
            );

            NotificationsService.success('Đăng nhập thành công', 'Thông báo');
        } else NotificationsService.error('Đăng nhập thất bại');
    } catch (ex) {
        console.log('[Auth] Login Error : ', ex.message);

        // login error
        yield put(
            actions.action.updateState({
                session_key: null,
                isLoggedIn: false,
                userInfo: null,
                isLoading: false,
            }),
        );

        if (Object.prototype.hasOwnProperty.call(ex, 'message')) {
            NotificationsService.error(ex.message);
            return;
        }

        NotificationsService.error(
            'Tài khoản chưa chính xác',
            'Đăng nhập thất bại',
        );
    }
}

// function* saga_LoginAdmin(action) {
//     try {
//         const { username, password } = action.payload;
//         const LoginResponse = yield loginAdmin(username, password);

//         if (LoginResponse.code === 200) {
//             const sessionKey = LoginResponse.data.token;
//             setLocalData("session_key", sessionKey);

//             const userInfo = LoginResponse.data.user;

//             // login success
//             yield put(
//                 actions.action.updateState({
//                     session_key: sessionKey,
//                     isLoggedIn: true,
//                     isLoading: false,
//                     userInfo,
//                     current_user_info: userInfo,
//                 })
//             );

//             NotifycationService.success("Đăng nhập thành công", "Thông báo");

//             yield put(cartActions.action.asyncGuestCart());
//         }
//     } catch (ex) {
//         console.log("[Auth] Login Error : ", ex.message);

//         // login error
//         yield put(
//             actions.action.updateState({
//                 session_key: null,
//                 isLoggedIn: false,
//                 userInfo: null,
//                 isLoading: false,
//             })
//         );

//         if (Object.prototype.hasOwnProperty.call(ex, 'message')) {
//             NotifycationService.error(ex.message);
//             return;
//         }

//         NotifycationService.error(
//             "Tài khoản chưa chính xác",
//             "Đăng nhập thất bại"
//         );
//     }
// }

function* saga_Logout() {
    try {
        setLocalData(key_const.session_key, null);
        NotificationsService.success(
            'Đăng xuất thành công',
            'Tạm biệt',
            'top-center',
        );

        yield put(
            actions.action.updateState({
                session_key: null,
                isLoggedIn: false,
                userInfo: null,
                isLoading: false,
            }),
        );

        yield put(
            RealtimeActions.disconnect()
        )
    } catch (ex) {
        console.log('[Auth] Logout Error : ', ex.message);
    }
}

function* saga_CheckSessionKey() {
    try {
        let req = yield APIServices.Auth.getUserInfo();
        let userInfo = req;

        yield put(
            actions.action.updateState({
                userInfo,
                current_user_info: userInfo,
            }),
        );
    } catch (ex) {
        console.log('[Auth] Get user info error : ', ex.message);

        yield put(
            actions.action.updateState({
                session_key: null,
                isLoggedIn: false,
                userInfo: null,
            }),
        );
        setLocalData(key_const.session_key, null);
    }
}

// function* saga_CheckSessionKeyAdmin() {
//     try {
//         var request = yield checkSessionAdmin();

//         if (request.code !== 200) {
//             yield put(
//                 actions.action.updateState({
//                     session_key: null,
//                     isLoggedIn: false,
//                     userInfo: null,
//                     isLoading: false,

//                     showMessageChangePassword: false,
//                     isChangePasswordOk: false,
//                 })
//             );
//             setLocalData("session_key", null);
//         }
//     } catch (ex) {
//         console.log("[Auth] saga_CheckSessionKeyAdmin error : ", ex.message);

//         if (ex.message && ex.message.code) {
//             yield put(
//                 actions.action.updateState({
//                     session_key: null,
//                     isLoggedIn: false,
//                     userInfo: null,
//                     isLoading: false,

//                     showMessageChangePassword: false,
//                     isChangePasswordOk: false,
//                 })
//             );
//             setLocalData("session_key", null);
//         }
//     }
// }

// function* saga_GetUserInfo() {
//     try {
//         var request = yield getUserInfo();

//         if (request.code === 200) {
//             let userInfo = request.data;

//             yield put(
//                 actions.action.updateState({
//                     isLoggedIn: true,
//                     userInfo: userInfo,
//                     current_user_info: userInfo,
//                     isLoading: false,

//                     showMessageChangePassword: false,
//                     isChangePasswordOk: false,
//                 })
//             );
//         } else {
//             yield put(
//                 actions.action.updateState({
//                     session_key: null,
//                     isLoggedIn: false,
//                     userInfo: null,
//                     isLoading: false,

//                     showMessageChangePassword: false,
//                     isChangePasswordOk: false,
//                 })
//             );
//             setLocalData("session_key", null);
//         }
//     } catch (ex) {
//         console.log("[Auth] saga_GetUserInfo error : ", ex.message);
//     }
// }

// function* saga_ChangePassword(action) {
//     try {
//         let { oldPassword, newPassword, confirmPassword } = action.payload;

//         // validate
//         let ok = true;
//         let message = "";

//         oldPassword = oldPassword.trim();
//         newPassword = newPassword.trim();
//         confirmPassword = confirmPassword.trim();

//         if (confirmPassword !== newPassword) {
//             ok = false;
//             message = "Xác nhận mật khẩu không chính xác";
//         }

//         if (newPassword === "") {
//             ok = false;
//             message = "Mật khẩu mới không được để trống";
//         }

//         if (oldPassword === "") {
//             ok = false;
//             message = "Mật khẩu cũ không được để trống";
//         }

//         if (!ok) {
//             yield put(
//                 actions.action.updateState({
//                     showMessageChangePassword: true,
//                     isChangePasswordOk: false,
//                     message: message,
//                 })
//             );

//             NotifycationService.error(message);
//             return;
//         }

//         // call api
//         try {
//             yield changePassword(oldPassword, newPassword);

//             yield put(
//                 actions.action.updateState({
//                     showMessageChangePassword: true,
//                     isChangePasswordOk: true,
//                     message: "Đổi mật khẩu thành công",
//                 })
//             );
//             yield put(actions.action.setModalChangePasswordAdmin(false))

//             NotifycationService.success("Đổi mật khẩu thành công");
//         } catch (ex) {
//             yield put(
//                 actions.action.updateState({
//                     showMessageChangePassword: true,
//                     isChangePasswordOk: false,
//                     message: ex.data,
//                 })
//             );

//             NotifycationService.error("Đổi mật khẩu thất bại");
//         }
//     } catch (ex) {
//         console.log("[Auth] Change password error : ", ex.message);
//         NotifycationService.error("Đổi mật khẩu thất bại");
//     }
// }

// function* saga_SaveCurrentUserInfo(action) {
//     try {
//         let userInfo = yield select((state) => state.auth.current_user_info);

//         let va = yield ValidateUserService.validate(userInfo);

//         if (!va.isValidate) {
//             NotifycationService.error(va.message);
//             return;
//         }

//         let isUpdated = true;
//         if (userInfo.file) {
//             let req = yield changeAvatar(userInfo.file);

//             if (!req.code === 200) isUpdated = false;
//         }

//         let info = {
//             fullName: userInfo.fullName,
//             phone: userInfo.phone,
//             sex: userInfo.sex,
//             dob: convertIsoDateToDatetime(userInfo.dob),
//             address: userInfo.address.trim(),
//             groupCustomerId: userInfo.groupCustomerId
//         };

//         let req = yield changeUserInfo(info);
//         if (!req.code === 200) isUpdated = false;

//         if (isUpdated)
//             NotifycationService.success(
//                 "Cập nhật thông tin cá nhân thành công"
//             );
//         else NotifycationService.error("Cập nhật thông tin cá nhân thất bại");

//         yield put(actions.action.getUserInfo());
//     } catch (ex) {
//         console.log("[Auth] saga_SaveCurrentUserInfo error : ", ex.message);
//     }
// }

function* listen() {
    yield takeEvery(actions.type.LOGIN, saga_Login);
    // yield takeEvery(actions.type.LOGIN_ADMIN, saga_LoginAdmin);

    yield takeEvery(actions.type.CHECK_SESSION, saga_CheckSessionKey);
    // yield takeEvery(
    //     actions.type.CHECK_SESSION_ADMIN,
    //     saga_CheckSessionKeyAdmin
    // );
    // yield takeEvery(actions.type.GET_USER_INFO, saga_GetUserInfo);
    yield takeEvery(actions.type.LOGOUT, saga_Logout);
    // yield takeEvery(actions.type.CHANGE_PASSWORD, saga_ChangePassword);

    // yield takeEvery(
    //     actions.type.SAVE_CURRENT_USER_INFO,
    //     saga_SaveCurrentUserInfo
    // );
}

export default function* authSaga() {
    yield all([fork(listen)]);
}
