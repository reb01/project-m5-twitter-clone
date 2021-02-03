import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "./constants";

const TweetAddToFeed = ({ setHomeTweets, setTweetIds }) => {
  const [tweetText, setTweetText] = useState("");
  const [countNumber, setCountNumber] = useState(280);
  const [disable, setDisable] = useState(true);

  const handleChange = (e) => {
    console.log("handleChange", handleChange);
    setCountNumber(280 - e.currentTarget.value.length);
    if (countNumber === 280) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    setTweetText(e.currentTarget.value);
  };

  return (
    <FormWrapper>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          fetch("/api/tweet", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: tweetText,
            }),
          })
            .then((res) => {
              console.log("res1", res);
              return res.json();
            })
            .then((res) => {
              console.log("res2", res);
              setTweetText("");
            })
            .then(
              fetch("/api/me/home-feed")
                .then((res) => res.json())
                .then((data) => {
                  setHomeTweets(data.tweetsById);
                  setTweetIds(data.tweetIds);
                })
            )
            .then(setCountNumber(280))
            .then(setDisable(true));
        }}
      >
        <Textarea
          type="text"
          value={tweetText}
          maxLength="280"
          onChange={handleChange}
          placeholder="What's happening?"
          maxWidth="500px"
        />

        <SubmitWrapper>
          <CountNumber>{countNumber}</CountNumber>
          <Button type="submit" value="Meow" disabled={disable}>
            Meow
          </Button>
        </SubmitWrapper>
      </form>
      <Divider />
    </FormWrapper>
  );
};
export default TweetAddToFeed;

const Divider = styled.div`
  height: 10px;
  width: 800px;
  background: rgb(230, 236, 240);
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Textarea = styled.textarea`
  background: white;
  padding-left: 10vw;
  padding-top: 3vw;
  margin-top: 20px;
  height: 150px;
  color: #293241;
  width: 800px;
  border: solid #e0e0e0;
  border-width: 1px;
  border-bottom-style: none;
  resize: none;
  outline: none;
  font-size: 24px;
`;

const SubmitWrapper = styled.div`
  width: 800px;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px;
  border: solid #e0e0e0;
  border-width: 1px;
  border-top-style: none;
`;

const Button = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  font-size: 25px;
  border-radius: 30px;
  font-weight: bold;
  color: white;

  background-color: ${COLORS.primary};
  &:hover {
    background-color: ${COLORS.hover};
  }
`;

const CountNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 20px;
`;

/* background-color: ${COLORS.secondary}; */
/* background-color: ${COLORS.primary}; */
