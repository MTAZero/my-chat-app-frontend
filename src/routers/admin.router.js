import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
}
from 'react-router-dom'

import SideBar from '../pages/share/sidebar'
import TopBar from '../pages/share/topbar'

import './admin.scss'

// page 
import ChatPage from '../pages/chat-page'
import { RouterLinks } from '../const'

export const AdminRouter = () => {
    return (
        <Router>
            <div className="MainApp">
                <TopBar />

                <div className="MainContainer">
                    <SideBar />
                    
                    <div className="MainContent">
                        <Switch>
                            <Route path={RouterLinks.ChatPage}>
                                <ChatPage />
                            </Route>
                            <Redirect to={RouterLinks.ChatPage} />
                        </Switch>
                    </div>

                </div>
            </div>

        </Router>
    )
}