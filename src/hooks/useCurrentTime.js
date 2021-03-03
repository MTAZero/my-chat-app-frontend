import React, { useState } from 'react'

export const useCurrentTimeHooks = () => {
    function getCurrentTime() {
        let date = new Date();
        return (
            date.getHours() +
            ': ' +
            date.getMinutes() +
            ': ' +
            date.getSeconds()
        );
    }

    let [time, setTime] = useState(getCurrentTime());

    setTimeout(() => {
        setTime(getCurrentTime());
    }, 1000);

    return [time];
}