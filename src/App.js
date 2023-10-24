import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

import profilePicture from './img/profile.png';

import github from './img/icons/github.png';
import stackOverflow from './img/icons/stackOverflow.png';
import wikipedia from './img/icons/wikipedia.png';
import X from './img/icons/x.png';
import leetcode from './img/icons/leetcode.png';

async function getFollowers() {
  const response = await axios.get('https://api.github.com/users/AngusC222');
  return response.data.followers;
}

async function getPublicRepos() {
  const response = await axios.get('https://api.github.com/users/AngusC222');
  return response.data.public_repos;
}

async function getReceivedStars() {
  let totalReceivedStars = 0;
  const response = await axios.get('https://api.github.com/users/AngusC222/repos');
  for (let repos = 0; repos < response.data.length; repos++) {
    totalReceivedStars += response.data[repos].stargazers_count;
  }
  return totalReceivedStars;
}

async function getTotalPullRequests() {
  const response = await axios.get('https://api.github.com/search/issues?q=type:pr+author:AngusC222');
  return response.data.total_count;
}

function App() {
  const [followersCount, setFollowersCount] = useState(null);
  const [publicReposCount, setPublicReposCount] = useState(null);
  const [receivedStarsCount, setReceivedStarsCount] = useState(null);
  const [pullRequestsCount, setPullRequestsCount] = useState(null);

  useEffect(() => {
    getFollowers().then((count) => setFollowersCount(count));
    getPublicRepos().then((count) => setPublicReposCount(count));
    getReceivedStars().then((count) => setReceivedStarsCount(count));
    getTotalPullRequests().then((count) => setPullRequestsCount(count));
  }, []);

  return (
    <div>
      <div className='profile'>
        <div className='profileHeader'>
          <img src={profilePicture} alt="My profile picture" id='profilePicture'/>
          <h1 id="fullName">Angus Crighton</h1>
          <p className="caption">Nodejs Developer</p>
          <h2>Github Statistics</h2>
          <p className="caption"><a href='https://github.com/AngusC222' id='githubStatsAnchor'>{pullRequestsCount} Pull Requests, {receivedStarsCount} Stars, {followersCount} Followers, {publicReposCount} Repos</a></p>
          <h2>Contact Me</h2>
          <p className='caption'><a href="https://github.com/AngusC222" target="_blank"><img src={github} className='socialIMG' alt="Github Logo"/></a><a href="https://x.com/AngusC_Tech" target="_blank"><img src={X} className='socialIMG' alt="X Logo"/></a><a href="https://stackoverflow.com/users/19276480/angus" target="_blank"><img src={stackOverflow} className='socialIMG' alt="Stack Overflow Logo"/></a><a href="https://en.wikipedia.org/wiki/User:AngusCrighton" target="_blank"><img src={wikipedia} className='socialIMG' alt="Wikipedia Logo"/></a><a href="https://leetcode.com/anguscrighton1/" target="_blank"><img src={leetcode} className='socialIMG' alt="Leetcode Logo"/></a></p>
        </div>
      </div>
    </div>
  );
}

export default App;
