# MERN Challenge: Book Search Engine

This is a restructure of an existing, fully-functioning, application taking it from a RESTful API to a GraphQL API.

---

## License

None

---

## Getting Started

### Built With

- Node
- GraphQL
- Inquirer

### Prerequisites

Installing the Development Dependencies and Dependencies use the following command:

```
- npm install OR npm i
```

### Development Dependency List

- `nodemon` - Version `^3.0.1`

---

### Application Dependency List

- `fs` - Version `^0.0.1-security`
- `inquirer` - Version `^6.5.2`
- `path` - Version `^0.12.7`

---

### Supported Scripts

These Commands are recognized

- `start` : Runs `node server.js`
- `dev` : Runs `npx nodemon server.js`

---

### List of API Routes

Because the is GraphQL, there are not any explicit routes defined, it all runs through `/GraphQL` and uses `Mutations` or `Queries` to accomplish `CRUD` with the data that are present.

---

## How To Use The App

### Application Feature List

## Features

This is a Book Search, using Google's Book API.

- Login/ Create an Account
- Search for Books
- Save them to your profile
- Delete them when done

## Tuition Payments

The Majority of this application went really well, and I made good progress quickly converting it over from the REST Api.

- This has to be one of the most painful payments I have ever made.
  - I have been working on converting this app to GraphQL as a replacement for the RESTful api. I have been at a standstill trying to get the last part to work.
  - I kept seeing a 404 error stating `Failed to load resource: the server responded with a status of 404 (Not Found)`
  - I did not know why that was happening. I have the back end working because I tested that with the graphql sandbox.
  - I also did not understand why, in the network logs, how to interpret what was happening. Until I found the `Headers` section. - This is what I saw:
    `Summary
URL: http://localhost:3000/graphql
Status: 404 Not Found
Source: Network
Address: ::1:3000
Initiator: 
createHttpLink.ts:188`
  - This is telling me that all my request are going on port 3000 yet.
  - That is problematic because I KNOW I set port 3001 up
  - `Vite` has a `proxy` configuration
    - `/api` is what I was putting all the requests over... not `/graphql`
- That explains why I was getting my 404, and even with the success of figuring that out I cannot help but be frustrated that it took me _this long_ to stop and look at not only the client and server logs but **also** the network requests.
- This is WEB development and is integral to the process.
- The frustration will pass as I move on now, and this lesson will not soon be forgotten. That, is good. It is now learned.

- The other big sticking point was trying to push to hard to get this all done in one shot. I _nearly_ did too, but I overlooked some initial items that later came back to bite me.

  - Logical operation of checking if all of the required data are present.
    - ```javascript
      if (!savedBooks.title || !savedBooks.authors) {
        throw Error;
      }
      ```
    - Initially, this was what I had, causing me an issue. `savedBooks.authors` is an array, of which, I was not checking the `length` property of.
    - So, given that this is a `Logical Or` I was never actually updating the set of data.

- Similarly, with the auth. I overlooked what that was actually doing in the example code from class.

## Acknowledgements

- I did the overwhelming majority of this with no help, other than my own research, however, I had a lot of troubles with the authentication/context. I did use the solved code when I had exhausted all other resources, ChatGPT, Examples from class, "Duck It" which is using Duck.com (DuckDuckGo.com) to search for something over Google.

## App Author

- Eric Hulse

If you have any questions about the repo, open an issue, or would like to contact me directly here is where I can be found.
(I do not use social media of any kind.)

- <a href="mailto:hulse@hey.com">Send Me An Email</a>
- You can find more of my work on my [Github](https://github.com/sempercuriosus/)
- Here is my <a href="https://sempercuriosus.github.io/PortfolioChallenge/">Personal Webpage</a>

---

## Final Note

This is the end! _Really_, this is the end of the beginning. I now know how much I do not know. Which, really, is something I expected from the get go, but still there is such a **wealth** of information out there now. What I have accomplished was a rapid onboarding of information to solidify a foundational knowledge allowing me the opportunity to shift my gears to Web Dev. I have really enjoyed learning the new technologies along the way to the start of my Web Development Career. There are an overwhelming number of choices and areas to go into.

I am welcoming the challenge!

