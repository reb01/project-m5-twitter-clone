import React, { useState, useEffect } from "react";
import TweetSmall from "./TweetSmall";
import TweetAddToFeed from "./TweetAddToFeed";
import styled, { keyframes } from "styled-components";

import { spinner6 } from "react-icons-kit/icomoon/spinner6";
import { Icon } from "react-icons-kit";
import ErrorPage from "./ErrorPage";

const HomeFeed = () => {
  const [homeTweets, setHomeTweets] = useState(null);
  const [tweetIds, setTweetIds] = useState(null);
  const [status, setStatus] = useState("loading");
  const [loading, setLoading] = React.useState("loading");

  useEffect(() => {
    fetch("/api/me/home-feed", {
      method: "GET",
      headers: {},
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("home feed data", data);
        const tweets = Object.values(data.tweetsById);
        const tweetIds = Object.values(data.tweetIds);
        console.log("tweetsById", tweets);
        console.log("tweetIds", tweetIds);
        console.log("tweetsById1", data.tweetsById);
        console.log("tweetIds1", data.tweetIds);
        setHomeTweets(data.tweetsById);
        setTweetIds(data.tweetIds);
        setLoading("idle");
      })
      .catch((err) => {
        console.error("error home", err);
        setLoading("error");
      });
  }, []);

  useEffect(() => {
    if (homeTweets && tweetIds) {
      setStatus("idle");
    }
  }, [homeTweets, tweetIds]);

  switch (loading) {
    case "loading":
      return (
        <div>
          <StyledIcon size={50} icon={spinner6} />
        </div>
      );
    case "error":
      return <ErrorPage />;
    default:
      return (
        <>
          <Home>HOME</Home>
          <Wrapper>
            <TweetAddToFeed
              setHomeTweets={setHomeTweets}
              setTweetIds={setTweetIds}
              homeTweets={homeTweets}
              tweetIds={tweetIds}
            />

            <SmallTweet>
              {tweetIds.map((tweetId) => (
                <TweetSmall
                  key={tweetId}
                  tweet={homeTweets[tweetId]}
                  tweetId={tweetId}
                />
              ))}
            </SmallTweet>
          </Wrapper>
        </>
      );
  }
};

const Home = styled.h2`
  margin-left: 40px;
`;
const Wrapper = styled.div`
  margin-left: 40px;
  max-width: 300px;
`;
const SmallTweet = styled.div`
  max-width: 300px;
`;

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledIcon = styled(Icon)`
  margin: 5% auto;
  animation: ${spinner} linear 1000ms infinite;
`;

export default HomeFeed;
