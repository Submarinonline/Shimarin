import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Tabs = () => (
      <ul id="tabs">
        <li className="tab tab-active" id="submarin">
          <Link to="/">Submarin</Link>
        </li>
        <li className="tab" id="conv">
          <Link to="/conv">変換</Link>
        </li>
        <li className="tab" id="settings">
          <Link to="/settings">設定</Link>
        </li>
      </ul>
)

const WindowCtl = () => (
      <ul id="window-ctl">
        <li id="window-ctl-min">
          <svg width="10" height="1" viewBox="0 0 10 1">
            <path d="M10 0v1H0V0z" />
          </svg>
        </li>
        <li className="window-ctl-show" id="window-ctl-max">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M10 0v10H0V0zM9 1H1v8h8z" />
          </svg>
        </li>
        <li id="window-ctl-restore">
          <svg width="11" height="11" viewBox="0 0 11 11">
            <path d="M11 9H9v2H0V2h2V0h9zM8 3H1v7h7zm2-2H3v1h6v6h1z" />
          </svg>
        </li>
        <li id="window-ctl-close">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M7 6l5 5-1 1-5-5-5 5-1-1 5-5-5-5 1-1 5 5 5-5 1 1z" />
          </svg>
        </li>
      </ul>
  )

const Header = () => (
  <header>
    <Tabs />
    <WindowCtl />
  </header>
)

const StyledHeader = styled(Header)`
  -webkit-app-region: drag;
  user-select: none;
  background: var(--titlebar);
  height: 32px;
  margin-top: 4px;
  margin-left: 4px;
  display: flex;
`

export default StyledHeader
