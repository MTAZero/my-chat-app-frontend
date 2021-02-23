import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../redux/count-module/actions';

const CounterControlComponent = () => {
    const dispatch = useDispatch();

    return (
        <div className="CounterControlComponent">
            <div
                className="ButtonZ"
                onClick={() => {
                    dispatch(actions.action.incCount(1));
                }}
            >
                +
            </div>
            <div
                className="ButtonZ"
                onClick={() => {
                    dispatch(actions.action.decCount(5));
                }}
            >
                -
            </div>
        </div>
    );
};

export default CounterControlComponent;
