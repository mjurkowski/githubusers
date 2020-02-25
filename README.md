# GitHub Users

## DEMO

https://mjurkowski.github.io/githubusers/

## How to run?

### Dependencies installation

```
yarn install
```

### Local run

To `.env` add `REACT_APP_GITHUB_TOKEN` with personal access token.

and run:

```
yarn start
```

### Build package

```
yarn build
```

## Testing

### E2E testing

To test final result I used Cypress. To run cypress tests:

Window mode:

```
yarn cy:open
```

Headless mode

```
yarn cy:run
```
