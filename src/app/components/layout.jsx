import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import "./global.scss"
import * as style from "./style.module.scss"


// Header

const WindowCtl = ({ windowApi, maximized=false, maximizeCallback=()=>{} }) => (
    <div className={style.window_ctl}>
        <div
            onClick={() => windowApi.minimize()}
            className={style.window_ctl__button}
        >
            <svg width="10" height="1" viewBox="0 0 10 1">
                <path d="M10 0v1H0V0z" />
            </svg>
        </div>
        {
            maximized ? (
                <div
                    onClick={() => {
                        maximizeCallback()
                        windowApi.unmaximize()
                    }}
                    className={style.window_ctl__button}
                >
                    <svg width="11" height="11" viewBox="0 0 11 11">
                        <path d="M11 9H9v2H0V2h2V0h9zM8 3H1v7h7zm2-2H3v1h6v6h1z" />
                    </svg>
                </div>
            ) : (
                <div 
                    onClick={() => {
                        maximizeCallback()
                        windowApi.maximize()
                    }}
                    className={style.window_ctl__button}
                >
                    <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M10 0v10H0V0zM9 1H1v8h8z" />
                    </svg>
                </div>
            )
        }
        <div
            onClick={() => windowApi.close()}
            className={style.window_ctl__button + ' ' + style.close}
        >
            <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M7 6l5 5-1 1-5-5-5 5-1-1 5-5-5-5 1-1 5 5 5-5 1 1z" />
            </svg>
        </div>
    </div>
);

const Tabs = ({ tabs=[], activeTabId="submarin", noPadding=false }) => {
    const history = useHistory()
    return (
        <div className={style.header_tab_bar + (noPadding ? ` ${style.wide}` : '')}>
            {
                tabs.map(({ id, linkPath, displayText }) => (
                    <div
                        key={id}
                        onClick={() => history.push(linkPath)}
                        className={
                            style.header_tab_bar__tab + (
                                (id===activeTabId)
                                    ? ` ${style.active}`
                                    : '')
                        }
                    >{displayText}</div>
                ))
            }
        </div>
    );
};


// Layout

const Layout = ({ windowApi, pageId, children }) => {
    const [windowMaximized, setWindowMaximized] = useState(false);
    windowApi.onMaximize(() => setWindowMaximized(true)); // 動かん ゴミ
    windowApi.onUnmaximize(() => setWindowMaximized(false)); // 動かん 何故
    useEffect(
        async () => setWindowMaximized(await windowApi.isMaximized()),
        []);

    const defaultTabs = [
        { id: "submarin", linkPath: "/", displayText: "Submarin" },
        { id: "conv", linkPath: "/conv", displayText: "変換" },
        { id: "settings", linkPath: "/settings", displayText: "設定" },
    ];

    return (
        <div>
            <header>
                <div className={style.row}>
                    <Tabs
                        tabs={[...defaultTabs]}
                        activeTabId={pageId}
                        noPadding={windowMaximized}
                    />
                    <WindowCtl
                        windowApi={windowApi}
                        maximized={windowMaximized}
                        maximizeCallback={() => setWindowMaximized(!windowMaximized)} // 応急措置
                    />
                </div>
            </header>
            <main /*className={windowFullScreen}*/>{children}</main>
        </div>
    )
}

export default Layout
