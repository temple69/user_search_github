import { useState } from "react";
import { Octokit } from "octokit";
import { githubUser } from "../types/types";

const useGitHubApi = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [githubUser, setGithubUser] = useState<githubUser>({
    name: "",
    username: "",
    company: "",
    location: "",
    bio: "",
    twitter_username: "",
    public_repos: 0,
    followers: 0,
    following: 0,
    profile_url: "",
    avatar_url: "",
    created_at: "",
  });
  const [isUserFound, setIsUserFound] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getGithubUser = async (username: string) => {
    try {
      setIsLoading(true);
      const octokit = new Octokit({
        auth: apiKey,
      });
      const data = await octokit.request("GET /users/{username}", {
        username: username,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      console.log(data);
      const githubUserData: githubUser = {
        name: data.data.name as string,
        username: data.data.login,
        company: data.data.company as string,
        created_at: data.data.created_at,

        location: data.data.location as string,

        bio: data.data.bio as string,
        twitter_username: data.data.twitter_username as string,
        public_repos: data.data.public_repos,
        followers: data.data.followers,
        following: data.data.following,
        profile_url: data.data.html_url,
        avatar_url: data.data.avatar_url,
      };
      console.log(githubUserData);
      setGithubUser(githubUserData);
    } catch (error) {
      setIsUserFound(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    githubUser,
    getGithubUser,
    isUserFound,
    isLoading,
  };
};

export default useGitHubApi;
