import React from 'react';

import Layout from '../components/layout';
// import '../css/settings.css';

const SettingsPage = () => {
    return (
        <Layout windowApi={window.mainWindow} pageId="settings">
            <div id="main"></div>
        </Layout>
    );
};

export default SettingsPage;
