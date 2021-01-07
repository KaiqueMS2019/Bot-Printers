import React from 'react'
import './header.css'
import appConfig from '../../../core/config'

const Header = () => {
    return(
        <div id="header">
            {appConfig.appName}
        </div>
    )
}

export default Header