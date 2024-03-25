# wilt

[![Test](https://github.com/triihim/wilt-web/actions/workflows/test.yml/badge.svg)](https://github.com/triihim/wilt-web/actions/workflows/test.yml)
[![Deploy](https://github.com/triihim/wilt-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/triihim/wilt-web/actions/workflows/deploy.yml)

[Wilt](https://wilt.triihimaki.com) (**W**hat **I** **L**earned **T**oday) is a hobby project with a focus on evolving into a learning journal with AI capabilities. Currently, the app allows users to document their learnings. In the future, the goal is to expand functionality to support the addition of both manually created and AI-generated flashcards. This feature aims to enhance the learning experience and will be complemented by statistics to track and motivate users in their learning journeys.


## Requirements to run

1. **Node.js** https://nodejs.org/en (version used in development 20.10)
2. **wilt-backend** available at https://github.com/triihim/wilt-backend

## Running the app locally

> [!IMPORTANT]
> This repository contains only the web client of the application, one will need the backend as well which is available at https://github.com/triihim/wilt-backend.

```bash
# install dependencies
npm install

# run the app in development mode
npm run dev
```

## TODO

- Add more tests, currently only the learning list page contains tests to test some of the core functionality.
- Better error handling and messages, currently the app only shows a generic "something went wrong" error message.
- Add UI notifications for better action feedback and user-experience
- More comprehensive statistics
- Improve accessibility, E.g. currently the statistics page is not accessible at all
- Flashcards feature
