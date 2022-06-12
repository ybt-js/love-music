import React from 'react'
import styled from 'styled-components'

function TopTitle(props) {

  return (
    <Wrap>
      <span>{'热门'}</span>
    </Wrap>
  )
}

export default TopTitle

const Wrap = styled.h3`

  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: var(--artist-title-color);

  span {
    color: #fff;
    padding: 0 20px;
  }
`
