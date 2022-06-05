import { HeartIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import axios from "axios";

function TweetForm() {
  const [text, setText] = useState("");

  const MAX_TWEET_CHAR = 250;

  function changeText(e) {
    setText(e.target.value);
  }

  return (
    <div className="border-b border-silver p-4 space-y-6">
      <div className="flex p-4 space-x-5">
        <img src="/src/avatar.png" className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>

      <form className="pl-16 text-lg flex flex-col">
        <textarea
          className="bg-transparent outline-none"
          value={text}
          name="text"
          placeholder="O que está acontecendo?"
          onChange={changeText}
        />
        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{text.length}</span> /{" "}
            <span className="text-birdBlue">250</span>
          </span>
          <button
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={text.length > MAX_TWEET_CHAR}
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

function Tweet({ name, username, avatar, children }) {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={avatar} />
      </div>
      <div className="space-y-1">
        <span className="font-bold text-sm">{name}</span>{" "}
        <span className="text-sm text-silver">@{username}</span>
        <p>{children}</p>
        <div className="flex space-x-1 text-silver text-sm items-center">
          <HeartIcon className="w-5 stroke-1" />
          <span>1.2k</span>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const token =
    "";
  const [data, setData] = useState("");

  async function getData() {
    const res = await axios.get("http://localhost:9901/tweets", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setData(res.data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TweetForm />
      <div>
        {data.length &&
          data.map((tweet) => (
            <Tweet
              name={tweet.user.name}
              username={tweet.user.username}
              avatar="/src/avatar.png"
            >
              {tweet.text}
            </Tweet>
          ))}
      </div>
    </>
  );
}
