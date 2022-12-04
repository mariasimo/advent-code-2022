# Advent of Code 2022

https://adventofcode.com/2022

- Clone repository and install dependencies: `npm install`
- Configure day to output at `package.json`:
```
config: {
  day: 1
}
```

**Scripts**
```
// Watch test of config day
"develop": "jest --watch src/day$npm_package_config_day/index.test.js",

// Watch solution of config day (day[number]/index.ts)
"solution:dev": "ts-node-dev --respawn --transpile-only --quiet --clear src/day$npm_package_config_day",

// Log every solved day
"solutions:log": "ts-node-dev build/src",

// Generate a new day boilerplace
"plop": "plop --plopfile scripts/plop/plopfile.js"
  
```
