import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { messageCircle } from "react-icons-kit/feather/messageCircle";
import { repeat } from "react-icons-kit/feather/repeat";
import { heart } from "react-icons-kit/feather/heart";
import { share } from "react-icons-kit/feather/share";
//import { CurrentUserContext } from "./CurrentUserContext";

const TweetActionBar = ({ id }) => {
  //   const { handleRetweet, numTweets, handleLike, numLikes } = React.useContext(
  //     CurrentUserContext
  //   );

  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);

  const [isRetweeted, setIsRetweeted] = useState(false);
  const [numTweets, setNumTweets] = useState(0);

  const handleLike = () => {
    if (!isLiked) setNumLikes((numLikes) => numLikes + 1);
    else setNumLikes((numLikes) => numLikes - 1);
    setIsLiked(!isLiked);
    fetch(`/api/tweet/${id}/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        body: JSON.stringify({ like: !isLiked }),
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleRetweet = () => {
    if (!isRetweeted) setNumTweets((numTweets) => numTweets + 1);
    else setNumTweets((numTweets) => numTweets - 1);
    setIsRetweeted(!isRetweeted);
    fetch(`/api/tweet/${id}/retweet`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        body: JSON.stringify({ retweet: !isRetweeted }),
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Wrapper>
        <Button>
          <Icon size={20} icon={messageCircle} />
        </Button>

        <Button onClick={handleRetweet}>
          <Icon size={20} icon={repeat} />

          <NumberOfRetweets>{numTweets}</NumberOfRetweets>
        </Button>

        <Button onClick={handleLike}>
          <Icon size={20} icon={heart} />

          <NumberOfLikes>{numLikes}</NumberOfLikes>
        </Button>

        <Button>
          <Icon size={20} icon={share} />
        </Button>
      </Wrapper>
    </>
  );
};
export default TweetActionBar;
const NumberOfLikes = styled.div`
  margin-left: 7px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-left: 40px;
  height: 40px;
`;
const Button = styled.button`
  display: flex;
  flex-direction: row;
  background: transparent;
  border: none !important;
  cursor: pointer;
  outline: none;
`;

const NumberOfRetweets = styled.div`
  margin-left: 7px;
  color: black;
`;
