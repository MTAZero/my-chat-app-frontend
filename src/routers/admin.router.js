import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
}
from 'react-router-dom'

import SideBar from '../pages/share/sidebar'
import TopBar from '../pages/share/topbar'

// page 
import ChatPage from '../pages/chat-page'

export const AdminRouter = () => {
    return (
        <Router>
            <div className="MainApp">
                <TopBar />

                <div className="MainContainer">
                    <SideBar />
                    
                    <div className="MainContent">
                        <Switch>
                            <Route path="/chat-app">
                                <ChatPage />
                            </Route>
                            <Redirect to="/chat-app" />
                        </Switch>
                    </div>

                </div>
            </div>

        </Router>
    )
}