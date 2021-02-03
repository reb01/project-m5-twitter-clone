import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Sidebar";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetailsBig from "./TweetDetailsBig";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <GlobalStyles />
        <Sidebar />
        <Main>
          <Switch>
            <Route exact path="/">
              <HomeFeed />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route path="/tweet/:tweetId">
              <TweetDetailsBig />
            </Route>
            <Route path="/:profileId">
              <Profile />
            </Route>
          </Switch>
        </Main>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;
