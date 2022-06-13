import React from "react";
import styled from "styled-components";

function TopTitle(props) {
  const { offsetY, title } = props;
  return (
    <Wrap offsetY={offsetY}>
      <span>{title}</span>
    </Wrap>
  );
}

export default TopTitle;

const Wrap = styled.h3`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: var(--artist-title-color);
  z-index: 1;
  transform: translate3d(0, ${props => props.offsetY}px, 0);

  span {
    color: #fff;
    padding: 0 20px;
  }
`;
