import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import HeaderTab from "./headerTab";
import WindowCtl from "./windowCtl";

const Tabs = ({ selectedId="submarin", additionalTabs=[] }) => {
    const defaultTabs = [
        { id: "submarin", linkPath: "/", displayText: "Submarin" },
        { id: "conv", linkPath: "/conv", displayText: "変換" },
        { id: "settings", linkPath: "/settings", displayText: "設定" },
    ];

    return (
        <div>
            {
                [...defaultTabs, ...additionalTabs].map(({ id, linkPath, displayText }) => (
                    <HeaderTab key={id} linkPath={linkPath} displayText={displayText} selected={id === selectedId} />
                ))
            }
        </div>
    );
};

const Header = ({ pageId }) => {
    const windowApi = window.mainWindow

    const [windowMaximized, setWindowMaximized] = useState(false);
    windowApi.onMaximize(() => setWindowMaximized(true));
    windowApi.onUnmaximize(() => setWindowMaximized(false));

    useEffect(
        async () => setWindowMaximized(await windowApi.isMaximized()),
        []);

    return (
        <header>
            <Tabs selectedId={pageId} />
            <WindowCtl windowApi={windowApi} maximized={windowMaximized} />
        </header>
    );
};

const StyledHeader = styled(Header)`
  -webkit-app-region: drag;
  user-select: none;
  background: var(--titlebar);
  height: 32px;
  margin-top: 4px;
  margin-left: 4px;
  display: flex;
`;

export default StyledHeader;
