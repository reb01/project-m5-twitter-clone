import React, { useState, useEffect } from "react";
export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [numOfLikes, setnumOfLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetch("/api/me/profile", {
      method: "GET",
      headers: {},
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data", data);
        setCurrentUser(data);
        setStatus("idle");
      });
  }, []);

  const handleToggleLike = () => {
    setIsLiked(() => {
      setnumOfLikes(!isLiked ? numOfLikes + 1 : numOfLikes - 1);
      return !isLiked;
    });
  };

  useEffect(() => {
    if (currentUser) {
      setStatus("idle");
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider
      value={{
        handleToggleLike,
        numOfLikes,
        setnumOfLikes,
        isLiked,
        setIsLiked,
        currentUser,
        setCurrentUser,
        status,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
