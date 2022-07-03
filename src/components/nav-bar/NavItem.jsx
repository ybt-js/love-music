import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function NavItem(props) {
  const location = useLocation();
  const [isActive, setIsActive] = useState(props.link === location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setIsActive(props.link === location.pathname);
  }, [location.pathname, props.link]);

  return (
    <NavItemWrap onClick={() => navigate(props.link)}>
      <div className={"icon " + (isActive ? "icon-active" : "")}>
        <div className="iconfont">{props.icon}</div>
      </div>
      <div className={isActive ? "title-active" : ""}>
        <span className="title">{props.title}</span>
      </div>
    </NavItemWrap>
  );
}

export default NavItem;

const NavItemWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .icon {
    width: 23px;
    height: 23px;
    border: 1px solid var(--tab-text-color);
    line-height: 25px;
    text-align: center;
    border-radius: 50%;
    margin: 2px 0;
  }
  .icon-active {
    width: 25px;
    height: 25px;
    border: 0;
    color: var(--tab-bg-color);
    background-color: var(--theme-color);
    transition: color 0.4s;
  }
  .title-active {
    color: var(--text-color);
  }
`;
