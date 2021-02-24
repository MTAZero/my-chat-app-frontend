import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import SideBar from '../pages/share/sidebar';
import TopBar from '../pages/share/topbar';

import './admin.scss';

// page
import ChatPage from '../pages/chat-page';
import TestContextPage from '../pages/test-context-page';

import { RouterLinks } from '../const';
import { LoginRequireComponent } from '../components/login-require';

export const AdminRouter = () => {
    return (
        <Route>
            <div className="MainApp">
                <TopBar />

                <div className="MainContainer">
                    <SideBar />

                    <div className="MainContent">
                        <Switch>
                            <LoginRequireComponent
                                exact
                                component={ChatPage}
                                path={RouterLinks.ChatPage}
                            />

                            <LoginRequireComponent
                                exact
                                component={TestContextPage}
                                path={RouterLinks.TestContext}
                            />

                            {/* <Redirect to={RouterLinks.ChatPage} /> */}
                        </Switch>
                    </div>
                </div>
            </div>
        </Route>
    );
};
