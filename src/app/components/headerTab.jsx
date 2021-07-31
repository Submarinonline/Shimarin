import React from 'react';
import { Link } from 'react-router-dom';

const HeaderTab = ({ displayText, linkPath='.', selected=false }) => {
    return (
        <div>
            <Link to={linkPath}>{displayText}</Link>
        </div>
    );
};

export default HeaderTab;
