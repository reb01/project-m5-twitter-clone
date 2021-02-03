import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import ActionBar from "./ActionBar";
import { Icon } from "react-icons-kit";
import { messageCircle } from "react-icons-kit/feather/messageCircle";
import { repeat } from "react-icons-kit/feather/repeat";
import { heart } from "react-icons-kit/feather/heart";
import { share } from "react-icons-kit/feather/share";
import ErrorPage from "./ErrorPage";
import styled, { keyframes } from "styled-components";
import { spinner6 } from "react-icons-kit/icomoon/spinner6";
const moment = require("moment");

const TweetDetailsBig = () => {
  const [status, setStatus] = useState("loading");
  const [tweetData, setTweetData] = useState();
  const { tweetId } = useParams();
  const [loading, setLoading] = React.useState("loading");

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`, {
      method: "GET",
      headers: {},
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("tweetId", data);
        setTweetData(data);
        setLoading("idle");
      })
      .catch((err) => {
        console.error("error big tweet", err);
        setLoading("error");
      });
  }, [tweetId]);

  useEffect(() => {
    if (tweetData) {
      console.log(tweetData);
      setStatus("idle");
    }
  }, [tweetData]);

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
          <Heading>
            {tweetData.tweet.author.handle === "giantcat9" ? (
              <Avatar
                alt="avatarSrc"
                src={
                  "https://raw.githubusercontent.com/reb01/photos/master/giantcat9-avatar.jpg"
                }
              />
            ) : (
              <Avatar alt="avatarSrc" src={tweetData.tweet.author.avatarSrc} />
            )}
            <HandleDisplayNames>
              <DisplayName>{tweetData.tweet.author.displayName}</DisplayName>
              <Handle>@{tweetData.tweet.author.handle}</Handle>
            </HandleDisplayNames>
          </Heading>
          <Status>{tweetData.tweet.status}</Status>
          <MediaImage>
            {tweetData.tweet.media.length !== 0 ? (
              <Media alt="Media" src={tweetData.tweet.media[0].url} />
            ) : null}
          </MediaImage>

          <Footer>
            <TimeStamp>
              {moment(tweetData.tweet.timestamp).format("hh:mm a - MMM D YYYY")}{" "}
            </TimeStamp>
            <Text>&nbsp;&nbsp;Critter web app</Text>
          </Footer>

          <Divider />
          <Action>
            <IconWrapper>
              <Icon size={20} icon={messageCircle} />
            </IconWrapper>

            <IconWrapper>
              <Icon size={20} icon={repeat} />
              {/* <NumberOfRetweets>{tweetData.tweet.numRetweets}</NumberOfRetweets> */}
            </IconWrapper>

            <IconWrapper>
              <Icon size={20} icon={heart} />
              {/* <NumberOfLikes>{tweetData.tweet.numLikes}</NumberOfLikes> */}
            </IconWrapper>

            <IconWrapper>
              <Icon size={20} icon={share} />
            </IconWrapper>
          </Action>
          <Divider />
        </>
      );
  }
};

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 40px;
`;
const Avatar = styled.img`
  width: 70px;
  border-radius: 50%;
`;
const HandleDisplayNames = styled.div`
  flex-direction: columnn;
  margin-left: 20px;
`;
const DisplayName = styled.div`
  font-weight: 550;
`;
const Handle = styled.div``;

const Status = styled.div`
  margin-left: 40px;
  font-size: 25px;
  font-weight: 450;
  margin-bottom: 20px;
`;
const MediaImage = styled.div`
  margin-left: 40px;
`;

const Media = styled.img`
  max-width: 700px;
  max-height: 400px;
  border-radius: 5%;
  margin-bottom: 20px;
`;

const Footer = styled.div`
  display: flex;
  margin-left: 40px;
  margin-bottom: 20px;
`;
const TimeStamp = styled.div``;
const Text = styled.div``;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
  margin-left: 40px;
`;
const IconWrapper = styled.div`
  /* height: 40px; */
  align-self: center;
`;
const NumberOfLikes = styled.div``;
const NumberOfRetweets = styled.div``;
const Action = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-left: 40px;
  height: 40px;
  /* margin-top: 20px; */
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

export default TweetDetailsBig;
