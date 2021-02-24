import { store } from 'react-notifications-component';
import React from 'react'

const success = (message = "", title = "Thông báo", postion = "top-center") => {
    store.addNotification({
        title: title,
        message: message,
        // content: anc,
        type: "success",
        insert: "top",
        container: postion,
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: false
        }
    });
}

const error = (message = "", title = "Thông báo", postion = "top-center") => {
    store.addNotification({
        title: title,
        message: message,
        type: "danger",
        insert: "top",
        container: postion,
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 1000,
            onScreen: false
        }
    });
}

export const NotificationsService = {
    success,
    error
}