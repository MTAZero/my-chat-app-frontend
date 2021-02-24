import React from 'react';
import { Link } from 'react-router-dom';
import { RouterLinks } from '../../../const';

import './index.scss';

const SideBar = () => {
    return (
        <div className="SideBar">
            SideBar
            <div>
                <Link to={RouterLinks.TestContext}>
                    {' '}
                    Go to TestContext Page
                </Link>
            </div>
            <div>
                <Link to={RouterLinks.ChatPage}> Go to Chat Page</Link>
            </div>
        </div>
    );
};

export default SideBar;
