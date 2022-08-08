### Basic requirements

- The only tech-stack requirement here is to use React.
- The application must be available via a public URL along with the public repository.
- You do not commit any Private Authentication Keys into the repository (send them along with the repository link in your email).

### Run the app!
Run the app by the command `yarn start` on the terminal. The app is also available at the url: 

<details>
  <summary>Notes</summary>
  
- the token is stored in the code: it is not a good practise and it is discouraged from the technical
assignment description too. The token though gives access to the public repos of a new account on Github, that forks the tech assignment on my main account: the new account was made to forbid any attacker to reach the main account by using the token. Also I thought that, by publishing the app on Github pages, the token would have been reachable from there anyway.
- I think my solution is over engineered: with more time I would have made it with react-query; here I have implemented it with Redux because I am more familiar with it and made me feel faster.
- I would have loved to provide the app covered by unit tests, sorry I didn't made it :(
- I would have loved to spend more time on the css and to add info about the repo (at least the name and url!); also I think that filters for the commits list would have been a nice addition.
</details>