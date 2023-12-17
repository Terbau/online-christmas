# Online Christmas Calendar

Quick project originally made for online's christmas calendar for the third sunday. The live website can be visited [here](https://online-christmas.vercel.app/).

## Installation

1. Clone this repository

2. Install dependencies:

```sh
pnpm install
```

## Configuration

Fill out all the necessary environment variables and put them in a `.env` file. You can use `.env.example` to see which fields are needed.

## Running Locally

1. First of all you need a postgres database running. How you do this is up to you but once its set up you need to set the `DATABASE_URL` env variable with the correct connection string.

2. Run migrations (first time only)

```sh
pnpm migrate
```

3. Start the dev server:

```sh
pnpm dev
```
