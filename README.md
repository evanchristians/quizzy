# Quizzy

Quizzy is an Overengineered Quiz App for no particular reason.

## Getting Started

### Server

Install node dependencies with either:

```bash
yarn
```

**OR**

```bash
npm install
```

Get the MySql server running with:

```bash
docker-compose up -d
```

*Create a new database named **quiz***

Then start the server with:

```bash
yarn start
```

**OR**

```bash
npm start
```

### Client

_The frontend source code is hosted in the **app** folder_

```bash
cd app
```

```bash
yarn
```

**OR**

```bash
npm install
```

```bash
yarn dev
```

**OR**

```bash
npm run dev
```

## Usage

The frontend uses **graphql-codegen** to generate types and react hooks from our graphql schema and can be run with:

```bash
cd app
```

```bash
yarn generate
```

**OR**

```bash
npm run generate
```

For some reason the MySql server is root accessible with an empty password even though it's set to be **example** in **docker-compose.yml**, if this is not the case for you, be sure to set the correct credentials for accessing your DB in **ormconfig.json**

## License

[MIT](https://choosealicense.com/licenses/mit/)
