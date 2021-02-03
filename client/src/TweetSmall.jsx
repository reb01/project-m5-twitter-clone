import React from "react";
import { NavLink } from "react-router-dom";
import TweetActionBar from "./TweetActionBar";
import styled, { keyframes } from "styled-components";
import { spinner6 } from "react-icons-kit/icomoon/spinner6";
import ErrorPage from "./ErrorPage";
import { Icon } from "react-icons-kit";
import { repeat } from "react-icons-kit/feather/repeat";
import { CurrentUserContext } from "./CurrentUserContext";
const moment = require("moment");

const TweetSmall = ({ tweet, tweetId }) => {
  const { currentUser } = React.useContext(CurrentUserContext);
  console.log("TwSm", currentUser);

  const [loading, setLoading] = React.useState("idle");

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
          <Wrapper>
            <CurrentUserPic>
              {currentUser.profile.handle === "giantcat9" ? (
                <Avatar3
                  alt="avatarSrc"
                  src={
                    "https://raw.githubusercontent.com/reb01/photos/master/giantcat9-avatar.jpg"
                  }
                />
              ) : (
                <Avatar3 alt="avatarSrc" src={currentUser.profile.avatarSrc} />
              )}
            </CurrentUserPic>
            {/* Link wrapper to the individual tweet */}
            <Link to={`/tweet/${tweetId}`}>
              {/* remoeowed */}
              <Wrapper2>
                <div>
                  {!tweet.retweetFrom ? (
                    ""
                  ) : (
                    <RemeowedFrom>
                      <Icon size={20} icon={repeat} />
                      {tweet.retweetFrom.displayName} remeowed
                    </RemeowedFrom>
                  )}
                </div>
                <WrapperFlex>
                  {/* avatar with link to profile of individual author */}
                  <AvatarMain>
                    <Link to={`/${tweet.author.handle}`}>
                      {/* avatar */}

                      {tweet.author.handle === "giantcat9" ? (
                        <Avatar
                          alt="avatarSrc"
                          src={
                            "https://raw.githubusercontent.com/reb01/photos/master/giantcat9-avatar.jpg"
                          }
                        />
                      ) : (
                        <Avatar alt="avatarSrc" src={tweet.author.avatarSrc} />
                      )}
                    </Link>
                  </AvatarMain>
                  <WrapperNameDateStatus>
                    <WrapperNameDate>
                      {/* display name */}
                      <Link to={`/${tweet.author.handle}`}>
                        <DisplayName>{tweet.author.displayName}</DisplayName>
                      </Link>
                      {/* handle */}
                      <Handle>@{tweet.author.handle} -</Handle>
                      {/* timestamp */}
                      <Timestamp>
                        {moment(tweet.timestamp).format("MMM D")}
                      </Timestamp>
                      {/* status */}
                    </WrapperNameDate>

                    <Status>{tweet.status}</Status>
                  </WrapperNameDateStatus>
                </WrapperFlex>

                {/* if there is a media banner then media banner is this                                                                                                                                                                                                                                             otherwise ("")*/}
                {tweet.media.length !== 0 ? (
                  <Media alt="Media" src={tweet.media[0].url} />
                ) : (
                  ""
                )}
              </Wrapper2>
            </Link>
            <TweetActionBar tweet={tweet} id={tweet.id} />
          </Wrapper>
        </>
      );
  }
};
export default TweetSmall;

// const AvatarInTextArea = styled.image`
//   position: relative;
// `;
const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const RemeowedFrom = styled.span`
  display: flex;
  width: 250px;
  margin-left: 60px;
  justify-content: space-evenly;
  margin-top: 20px;
`;
const CurrentUserPic = styled.div`
  position: absolute;
  top: 120px;
  left: 290px;
`;

const Wrapper = styled.div`
  border: solid #e0e0e0;
  border-width: 1px;
  width: 800px;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const WrapperFlex = styled.div`
  display: flex;
`;
const WrapperNameDateStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: 30px;
`;
const Handle = styled.div`
  margin-right: 6px;
`;
const WrapperNameDate = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const DisplayName = styled.div`
  font-weight: 900;
  margin-right: 6px;
`;
const Timestamp = styled.div``;
const Status = styled.div`
  font-weight: 510;
`;
const StyledIcon = styled(Icon)`
  margin: 5% auto;
  animation: ${spinner} linear 1000ms infinite;
`;

const Avatar = styled.img`
  width: 70px;
  border-radius: 50%;
  margin-left: 40px;
`;
const Avatar3 = styled.img`
  width: 70px;
  border-radius: 50%;
  margin-left: 40px;
`;
const AvatarMain = styled.div`
  margin-top: 15px;
`;

const Media = styled.img`
  width: 600px;
  height: 400px;
  border-radius: 5%;
  margin-left: 140px;
  margin-bottom: 15px;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
