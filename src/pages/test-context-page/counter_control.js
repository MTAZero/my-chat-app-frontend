import React from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../context';
import actions from '../../redux/count-module/actions';

const CounterControlComponent = () => {
    const dispatch = useDispatch();

    const { currentTheme, setTheme } = useTheme()

    return (
        <div className="CounterControlComponent">
            <div
                className="ButtonZ"
                style={{
                    backgroundColor: currentTheme.background,
                    color: currentTheme.foreground
                }}
                onClick={() => {
                    dispatch(actions.action.incCount(1));
                }}
            >
                +
            </div>
            <div
                className="ButtonZ"
                style={{
                    backgroundColor: currentTheme.background,
                    color: currentTheme.foreground
                }}
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
