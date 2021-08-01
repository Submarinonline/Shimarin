import React from 'react';

import Layout from '../components/layout';

const IndexPage = () => {
    return (
        <Layout windowApi={window.mainWindow} pageId="submarin">
            <div id="bar" />
            <div className="main-cont main-cont-show" id="cont-submarin">
                a
            </div>
        </Layout>
    );
};

export default IndexPage;
