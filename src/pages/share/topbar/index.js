import React, { useEffect } from 'react'
import { RouterLinks } from '../../../const'
import { NotificationsService } from '../../../utils/helper'

import './index.scss'

const TopBar = () => {

    return (
        <div className="TopBar">
            TopBar

            <a href={RouterLinks.Login}>Đăng xuất</a>
        </div>
    )
}

export default TopBar