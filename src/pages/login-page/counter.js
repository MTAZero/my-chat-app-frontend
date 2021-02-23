import React from 'react'
import { useSelector } from 'react-redux'

const CounterComponent = () => {
    const count = useSelector(state => state.counter.count)

    return (
        <div>
            Count: <b>{count}</b>
        </div>
    )
}

export default CounterComponent