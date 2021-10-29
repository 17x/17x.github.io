### NodeJS ENV
```
node version: 12.16.2
npm version: 7.19.0
```

### Install
```
# Install from package.json
npm i

# Config husky
npx husky install
npm set-script prepare "husky install"
npx husky add .husky/pre-commit "npx lint-staged"

# Enable ESLint and prettier in webstorm
```