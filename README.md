### Basic requirements

- The only tech-stack requirement here is to use React.
- The application must be available via a public URL along with the public repository.
- You do not commit any Private Authentication Keys into the repository (send them along with the repository link in your email).

### Run the app!
Run the app by the command `yarn start` on the terminal. The app is also available at the url: https://lzzlucareadonly.github.io/

<details>
  <summary>Notes</summary>
  
- the token is stored in the code: it is not a good practise and it is discouraged from the technical
assignment's description too. The token though gives access to the public repos of a new account on Github, that forks the tech assignment on my main account: the new account was made to forbid any attacker from reaching the main account. Also I thought that, by publishing the app on Github pages, the token would have been reachable anyway.
- I think my solution could have been simpler by using react-query; here I have choosen Redux because I am more familiar with it and made me feeling faster.
- I would have loved to provide the app covered by unit tests, sorry I didn't made it :(
- I would have loved to spend more time on the css and to add info about the repo (at least a dynamic name!); also I think that filters for the commits list would have been a nice addition.
- there is a working pagination shipped with the app but it is not visible; to debug it I used to set the `const API_URL = '/repos/vuejs/vue/commits'` on the file _src/constants.ts_
</details>