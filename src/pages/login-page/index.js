import React from 'react'
import './index.scss'

// subcomponent
import CounterControlComponent from './counter_control'
import CounterComponent from './counter'

const LoginPage = () => {
    return (
        <div className="LoginPage">
            <div>Use Redux example</div>
            <CounterControlComponent />
            <CounterComponent />
        </div>
    )
}

export default LoginPage