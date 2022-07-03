import React from "react";
import styled from "styled-components";
import NavItem from "./NavItem";
import NavPlayer from '@/components/player/children/NavPlayer'

function NavBar() {
  return (
    <Nav>
      <NavItem link="/" icon="&#xe925;" title="推荐" />
      <NavItem link="/artist" icon="&#xe638;" title="歌手" />
      <NavPlayer />
      <NavItem link="/toplist" icon="&#xe668;" title="排行" />
      <NavItem link="/profile" icon="&#xe628;" title="我的" />
    </Nav>
  );
}

export default NavBar;

const Nav = styled.nav`
  display: flex;
  position: fixed;
  width: 100%;
  height: 55px;
  bottom: 0;
  left: 0;
  justify-content: center;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  background-color: var(--tab-bg-color);
  color: var(--tab-text-color);
  opacity: 0.95;
`;
