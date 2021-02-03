import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import TweetActionBar from "./TweetActionBar";
import styled, { keyframes } from "styled-components";
import { Icon } from "react-icons-kit";
import { spinner6 } from "react-icons-kit/icomoon/spinner6";
import { calendarCheckO } from "react-icons-kit/fa/calendarCheckO";

import { repeat } from "react-icons-kit/feather/repeat";

import { mapPin } from "react-icons-kit/fa/mapPin";
import ErrorPage from "./ErrorPage";
const moment = require("moment");

const Profile = () => {
  const { profileId } = useParams();

  const [status, setStatus] = useState("loading");
  const [profile, setProfile] = useState();
  const [profileFeed, setProfileFeed] = useState();
  const [loading, setLoading] = React.useState("loading");

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        console.log("data.profile", data.profile);
        setLoading("idle");
      })
      .catch((err) => {
        console.error("error profile", err);
        setLoading("error");
      });
  }, []);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        console.log("original data", data);
        const tweets = Object.values(data.tweetsById);
        setProfileFeed(tweets);
        console.log("data.feed", tweets);
      });
  }, []);

  useEffect(() => {
    if (profile && profileFeed) {
      console.log(profile, profileFeed);
      setStatus("idle");
    }
  }, [profile, profileFeed]);

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
            {profile.handle === "giantcat9" ? (
              <Banner
                alt="Banner"
                src={
                  "https://raw.githubusercontent.com/reb01/photos/master/giantcat9-banner.jpeg"
                }
              />
            ) : (
              <Banner alt="Banner" src={profile.bannerSrc} />
            )}
            <ProfileWrapper>
              {profile.handle === "giantcat9" ? (
                <Avatar
                  alt="avatarSrc"
                  src={
                    "https://raw.githubusercontent.com/reb01/photos/master/giantcat9-avatar.jpg"
                  }
                />
              ) : (
                <Avatar alt="avatarSrc" src={profile.avatarSrc} />
              )}
              <DisplayName>{profile.displayName}</DisplayName>
              <Handle>@{profile.handle}</Handle>
              <Bio>{profile.bio}</Bio>
              <LocationJoined>
                <Location>
                  <Icon size={15} icon={mapPin} />
                  <Location1>{profile.location}</Location1>
                </Location>
                <Joined>
                  <Icon size={15} icon={calendarCheckO} />
                  <Joined1>
                    Joined {moment(profile.joined).format("MMMM YYYY")}
                  </Joined1>
                </Joined>
              </LocationJoined>
              <FollowingFollowers>
                <Following>
                  <Bold>{profile.numFollowing}</Bold> Following
                </Following>
                <Followers>
                  <Bold>{profile.numFollowers}</Bold> Followers
                </Followers>
              </FollowingFollowers>
            </ProfileWrapper>
            <TWeetsMediaLikes>
              <span>Tweets</span>
              <span>Media</span>
              <span>Likes</span>
            </TWeetsMediaLikes>
          </Wrapper>

          {(profileFeed || [])
            .filter(
              (tweet) =>
                profile.handle === tweet.author.handle ||
                (tweet.retweetFrom &&
                  profile.handle === tweet.retweetFrom.handle)
            )
            .map((tweet, i) => {
              return (
                <MainWrapper2>
                  <List key={i}>
                    {tweet.retweetFrom &&
                    profile.handle === tweet.retweetFrom.handle ? (
                      <RemeowedFrom>
                        <Icon size={20} icon={repeat} />
                        {tweet.retweetFrom.displayName} remeowed
                      </RemeowedFrom>
                    ) : (
                      <>
                        <div>{""}</div>
                      </>
                    )}{" "}
                    <WrapperFlex>
                      {/* avatar with link to profile of individual author */}
                      <AvatarMain>
                        <Link to={`/${tweet.author.handle}`}>
                          {/* avatar */}

                          {tweet.author.handle === "giantcat9" ? (
                            <Avatar2
                              alt="avatarSrc"
                              src={
                                "https://raw.githubusercontent.com/reb01/photos/master/giantcat9-avatar.jpg"
                              }
                            />
                          ) : (
                            <Avatar2
                              alt="avatarSrc"
                              src={tweet.author.avatarSrc}
                            />
                          )}
                        </Link>
                      </AvatarMain>
                      <WrapperNameDateStatus>
                        <WrapperNameDate>
                          {/* display name */}
                          <DisplayName>{tweet.author.displayName}</DisplayName>
                          {/* handle */}
                          <Handle>@{tweet.author.handle} - </Handle>
                          {/* timestamp */}
                          <Timestamp>
                            {moment(tweet.timestamp).format("MMM D")}
                          </Timestamp>
                          {/* status */}
                        </WrapperNameDate>

                        <Status>{tweet.status}</Status>
                      </WrapperNameDateStatus>
                    </WrapperFlex>
                    {tweet.media.length !== 0 ? (
                      <Media alt="Media" src={tweet.media[0].url} />
                    ) : null}
                  </List>
                  <TweetActionBar tweet={tweet} id={tweet.id} />
                </MainWrapper2>
              );
            })}
        </>
      );
  }
};

export default Profile;
const ProfileWrapper = styled.div`
  margin-left: 30px;
`;
const RemeowedFrom = styled.span`
  display: flex;
  width: 250px;
  margin-left: 60px;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const Bold = styled.div`
  font-weight: bold;
  margin-right: 3px;
`;

const Joined = styled.div`
  display: flex;
  margin-left: 15px;
`;

const Following = styled.div`
  margin-right: 15px;
  display: flex;
`;
const Followers = styled.div`
  display: flex;
`;
const Joined1 = styled.div`
  margin-left: 5px;
`;

const Location1 = styled.div`
  margin-left: 5px;
`;
const AvatarMain = styled.div`
  margin-top: 15px;
`;
const Wrapper = styled.div`
  border: solid #e0e0e0;
  border-width: 1px;
  width: 800px;
  margin-left: 40px;
`;
const MainWrapper2 = styled.div`
  border: solid #e0e0e0;
  border-width: 1px;
  width: 800px;
  margin-left: 40px;
  padding-left: 30px;
`;
const LocationJoined = styled.div`
  display: flex;
  margin-bottom: 15px;
  opacity: 0.6;
`;
const FollowingFollowers = styled.div`
  display: flex;
  margin-bottom: 15px;
  opacity: 0.6;
  margin-left: 3px;
`;
const DisplayName = styled.div`
  font-weight: bold;
  font-size: 17px;
`;

const Handle = styled.div`
  margin-bottom: 15px;
`;

const Bio = styled.div`
  margin-bottom: 15px;
`;

const TWeetsMediaLikes = styled.div`
  display: flex;
  width: 800px;
  justify-content: space-around;
  font-weight: bold;
  padding: 15px;
`;

const List = styled.div``;
const Avatar = styled.img`
  position: absolute;
  top: 220px;
  left: 290px;
  width: 110px;
  border-radius: 50%;
  margin-left: 40px;
`;

const Avatar2 = styled.img`
  width: 70px;
  border-radius: 50%;
  margin-left: 40px;
`;

const Banner = styled.img`
  width: 800px;
  margin-bottom: 70px;
`;

const Media = styled.img`
  width: 600px;
  height: 400px;
  border-radius: 5%;
  margin-left: 140px;
`;

const Location = styled.div`
  display: flex;
  margin-right: 20px;
`;
const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Timestamp = styled.div``;

const StyledIcon = styled(Icon)`
  margin: 5% auto;
  animation: ${spinner} linear 1000ms infinite;
`;

const WrapperFlex = styled.div`
  display: flex;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const WrapperNameDateStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: 30px;
`;

const WrapperNameDate = styled.div`
  display: flex;
`;

const Status = styled.div`
  font-weight: 510;
`;
