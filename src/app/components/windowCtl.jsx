import React from 'react'

const WindowCtl = ({ windowApi, maximized=false }) => {
    return (
        <div>
            <div onClick={() => windowApi.minimize()}>
                <svg width="10" height="1" viewBox="0 0 10 1">
                    <path d="M10 0v1H0V0z" />
                </svg>
            </div>
            {
                maximized ? (
                    <div onClick={() => windowApi.unmaximize()}>
                        <svg width="11" height="11" viewBox="0 0 11 11">
                            <path d="M11 9H9v2H0V2h2V0h9zM8 3H1v7h7zm2-2H3v1h6v6h1z" />
                        </svg>
                    </div>
                ) : (
                    <div onClick={() => windowApi.maximize()}>
                        <svg width="10" height="10" viewBox="0 0 10 10">
                            <path d="M10 0v10H0V0zM9 1H1v8h8z" />
                        </svg>
                    </div>
                )
            }
            <div onClick={() => windowApi.close()}>
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M7 6l5 5-1 1-5-5-5 5-1-1 5-5-5-5 1-1 5 5 5-5 1 1z" />
                </svg>
            </div>
        </div>
    );
};

export default WindowCtl;
