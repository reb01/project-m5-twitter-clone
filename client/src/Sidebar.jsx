import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { home } from "react-icons-kit/icomoon/home";
import { user } from "react-icons-kit/icomoon/user";
import { bell } from "react-icons-kit/icomoon/bell";
import { bookmark } from "react-icons-kit/icomoon/bookmark";
import { COLORS } from "./constants";

import { Icon } from "react-icons-kit";

const Sidebar = () => {
  return (
    <Wrapper>
      <Nav>
        <>
          {" "}
          <Wrapper2>
            <Logo style={{ height: 53, width: 36 }} />
          </Wrapper2>
          <Wrapper1>
            <Icon size={20} icon={home}></Icon>
            <StyledLink1 to="/" activeStyle={{ color: "#4c00ff" }}>
              Home
            </StyledLink1>
          </Wrapper1>
          <Wrapper1>
            <Icon size={20} icon={user}></Icon>
            <StyledLink1 to="/treasurymog" activeStyle={{ color: "#4c00ff" }}>
              Profile
            </StyledLink1>
          </Wrapper1>
          <Wrapper1>
            <Icon size={20} icon={bell}></Icon>
            <StyledLink1 to="/notifications" activeStyle={{ color: "#4c00ff" }}>
              Notifications
            </StyledLink1>
          </Wrapper1>
          <Wrapper1>
            <Icon size={20} icon={bookmark}></Icon>
            <StyledLink1 to="/bookmarks" activeStyle={{ color: "#4c00ff" }}>
              Bookmarks
            </StyledLink1>
          </Wrapper1>
        </>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 250px;
`;
const Wrapper1 = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: flex-start;
  margin-left: 11px;
`;
const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: flex-start;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLink = styled(Link)`
  border: 1px solid transparent;
  border-radius: 4px;
  color: black;

  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;

  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    color: ${COLORS.primary};
  }
`;

const StyledLink1 = styled(NavLink)`
  border: 1px solid transparent;
  border-radius: 4px;
  color: black;

  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;

  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    color: ${COLORS.primary};
  }
`;
export default Sidebar;
