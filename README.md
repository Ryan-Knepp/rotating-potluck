# Rotating Potluck Randomizer

Do you have a rotating potluck? Does your church also use [Planning Center](https://www.planningcenter.com/)? Then do I have a somewhat ok tool for you.

Introducing...well...you already saw the name. It's a potluck randomizer. It will save your organizer minutes of their time.

## Setup

You'll need a top level `.env` file with these values:
```
PCO_APP_ID=<Your Planning Center App ID>
PCO_SECRET=<Your Planning Center Secret>
DOMAIN=http://localhost:8000
```
Check out [Planning Center's documentation](https://developer.planning.center/docs/#/overview/authentication) for more information on how to obtain your app ID and secret.

You'll also need a `frontend/.env` file with this value:
```
VITE_API_URL=http://localhost:8000
```

You'll also need a rails `master.key` under `config`.


## Running Locally

First spin up a local postgres db. This can be done with `docker compose up` in terminal 1.

For the first time running rails, you'll need to run `rails db:prepare`.
Then run the server with `rails s` in terminal 2.

Then get the front end running by `cd`'ing into `frontend`. For the first time `yarn install`. Then run `yarn dev`.

...maybe I should just move everything to docker compose

<span style="font-family: 'Times New Roman'">V:VIII</span>
