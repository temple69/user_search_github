import { useRef, useState } from "react";
//importing icons
import DarkMode from "./Icons/Icons";
import Bitmap from "../assets/Bitmap.png";
import Location from "./Icons/Location";
import Twitter from "./Icons/Twitter";
import Link from "./Icons/Link";
import Office from "./Icons/Office";
import Search from "./Icons/Search";
import LightMode from "./Icons/Light";
//importing hooks
import useGitHubApi from "../hooks/useGitHubApi";
//importing components
import Modal from "./Modal/Modal";
//importing helper functions
import { convertUtcToLocal, formatDate } from "../utils/helperFunctions";

const Finder = () => {
  const [isDarkMode, setDarkMode] = useState(false); //state to handle dark mode
  //Destructuring from useGithubApi hook
  const { githubUser, getGithubUser, isUserFound, isLoading } = useGitHubApi();
  const inputRef = useRef<HTMLInputElement>(null); //input ref
  //Function to handle dark mode
  const handleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };
  //Function to handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = inputRef.current?.value;
    if (username) {
      getGithubUser(username);
    } else {
      alert("Please enter a username");
    }
    inputRef.current!.value = "";
  };
  //Destructuring githubUser object
  const {
    name,
    username,
    company,
    location,
    bio,
    twitter_username,
    public_repos,
    followers,
    following,
    profile_url,
    avatar_url,
    created_at,
  } = githubUser;
  //Profile summary
  const profile_summary = [
    {
      title: "Repos",
      value: public_repos ? public_repos : 8,
    },
    {
      title: "Followers",
      value: followers ? followers : 3938,
    },
    {
      title: "Following",
      value: following ? following : 9,
    },
  ];
  //Social media
  const social_media = [
    {
      value: location ? location : "San Francisco",
      component: <Location isDarkMode={isDarkMode} />,
    },
    {
      value: twitter_username ? (
        <a href={`https://twitter.com/${twitter_username}`} target="_blank">
          {twitter_username as string}
        </a>
      ) : (
        "Not avaliable"
      ),
      component: <Twitter isDarkMode={isDarkMode} />,
    },
    {
      value: profile_url ? (
        <a href={profile_url} target="_blank">
          {profile_url}
        </a>
      ) : (
        "https://github.blog"
      ),
      component: <Link isDarkMode={isDarkMode} />,
    },

    {
      value: company ? company : "@github",
      component: <Office isDarkMode={isDarkMode} />,
    },
  ];
  //getting local date
  const localDate = convertUtcToLocal(created_at);

  return (
    <main
      className={`flex justify-center h-[100vh] items-center min-w-fit ${
        isDarkMode ? "bg-[#141D2F]" : "bg-[#F6F8FF]"
      }`}
    >
      {isLoading ? <Modal /> : ""}
      <section className="w-full md:w-[80%] lg:w-[55%] px-4">
        <div className="flex justify-between">
          <h3
            className={`${
              isDarkMode ? "text-[#fff]" : "text-[#222731]"
            } text-[1.625rem] font-bold`}
          >
            devFinder
          </h3>
          <article className="flex gap-4 items-center">
            <h5 className={`${isDarkMode ? "text-white" : "text-[#697C9A]"}`}>
              {isDarkMode ? "LIGHT" : "DARK"}
            </h5>
            <span onClick={handleDarkMode}>
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </span>
          </article>
        </div>
        <form
          onSubmit={handleSearch}
          className={`${
            isDarkMode
              ? "bg-[var(--advance-dark-color)]"
              : "bg-[var(--advance3-light-color)]"
          } shadow_custom w-full h-[4.3125rem] rounded-[0.9375rem] mt-4 flex items-center px-4 gap-2 justify-between`}
        >
          <fieldset className="flex gap-2 w-[50%]">
            <legend className="sr-only">Search Github username</legend>
            <span>
              <Search />
            </span>
            <input
              type="text"
              placeholder="Search Github username..."
              className={`${
                isDarkMode
                  ? "text-[#fff] placeholder:text-[#fff]"
                  : "text-[#222731] placeholder:text-[#4B6A9B]"
              } w-full bg-transparent outline-none placeholder:text-[0.8125rem] md:placeholder:text-[1.125rem]`}
              ref={inputRef}
            />
          </fieldset>
          <fieldset className="flex gap-4 items-center">
            {isUserFound ? (
              <span></span>
            ) : (
              <p className="text-[#F74646] text-[0.875rem] md:text-base font-bold">
                No results
              </p>
            )}
            <button
              className={`bg-[#0079FF] text-white text-[0.875rem] md:text-base font-bold rounded-[0.625rem]  h-[2.5rem] md:h-[3.125rem] px-3`}
            >
              Search
            </button>
          </fieldset>
        </form>
        <section
          className={`${
            isDarkMode
              ? "bg-[var(--advance-dark-color)]"
              : "bg-[var(--advance3-light-color)]"
          } shadow_custom w-full  rounded-[0.9375rem] mt-4  px-6 pt-10 pb-2`}
        >
          <div className="flex gap-2 md:gap-5">
            <aside className=" w-[58%] md:w-[60%] lg:w-[30%]">
              <img
                src={avatar_url ? avatar_url : Bitmap}
                alt="Bitmap"
                className=" w-[4.375rem] md:w-[7.3125rem] md:h-[7.3125rem] rounded-[7.3125rem]"
              />
            </aside>
            <article className=" flex flex-col lg:flex-row justify-center lg:justify-between w-full  gap-0 md:gap-4  ">
              <h2
                className={`${
                  isDarkMode
                    ? "text-white"
                    : "text-[var(--advance-light-color)]"
                } text-base md:text-[1.625rem] font-bold`}
              >
                {name ? name : " The Octocat"}
                <span className="block text-[0.815rem] md:text-base text-[var(--primary-light-color)]">
                  {username ? `@${username}` : "@octocat"}
                </span>
              </h2>
              <p
                className={`${
                  isDarkMode
                    ? "text-white"
                    : "text-[var(--secondary-light-color)]"
                }  text-[0.8125rem] md:text-[0.9375remrem] font-normal`}
              >
                Joined {created_at ? formatDate(localDate) : "25 Jan 2011"}
              </p>
            </article>
          </div>
          <div className="relative pl-0 lg:pl-[26%] my-5 lg:bottom-16">
            <article>
              <p className={`${isDarkMode ? "text-white" : "text-[#4B6A9B]"}`}>
                {bio
                  ? bio
                  : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."}
              </p>
            </article>
            <div
              className={`rounded-[0.625rem] flex gap-6 justify-around h-[5.3125rem] items-center my-4  ${
                isDarkMode
                  ? "bg-[var(--tertiary-dark-color)]"
                  : "bg-[var(--advance2-light-color)]"
              }`}
            >
              {profile_summary.map((item, index) => (
                <article key={index} className="flex flex-col items-center">
                  <p
                    className={`${
                      isDarkMode ? "text-white" : "text-[#4B6A9B]"
                    } text-[0.8125rem]`}
                  >
                    {item.title}
                  </p>
                  <h2
                    className={`${
                      isDarkMode
                        ? "text-white"
                        : "text-[var(--advance-light-color)]"
                    } font-bold text-[1.375rem] uppercase text-left`}
                  >
                    {item.value}
                  </h2>
                </article>
              ))}
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {social_media.map((item, index) => (
                <article
                  key={index}
                  className={`rounded-[0.625rem] flex gap-4 items-center`}
                >
                  {item.component}
                  <p
                    className={`${
                      isDarkMode ? "text-white" : "text-[#4B6A9B]"
                    } text-[0.8125rem] md:text-[0.9375rem]`}
                  >
                    {item.value}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Finder;
