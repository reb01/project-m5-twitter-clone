import React from "react";
import { Icon } from "react-icons-kit";

import { u1F4A3 } from "react-icons-kit/noto_emoji_regular/u1F4A3";

import styled from "styled-components";

const ErrorPage = () => {
  return (
    <StyledDiv>
      <Icon size={60} icon={u1F4A3} />
      <div>An unknown error has occured.</div>
      <div>
        Please try refreshing the page, or contact support if the problem
        persists.
      </div>
    </StyledDiv>
  );
};
export default ErrorPage;

const StyledDiv = styled.div`
  width: 100%;
  margin: 10% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: sans-serif;
  h2 {
    margin: 2rem 0 1rem;
  }
  span {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;
