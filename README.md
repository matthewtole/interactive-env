# interactive-env
Simple Node.js command line tool for initialising your environment variables

## Installation

You can install interactive-env globally so you can use it across all of your projects, or as a dependency in package.json so that everyone who works on the project can use it. 

### Global Install

```
npm install --global interactive-env
```

### Local Install

```
npm install --save-dev interactive-env
```

## Usage

### Global Install

If you have `interactive-env` installed globally, you can run it directly from the command line.

```
$ interactive-env
```

### Local Install

If you have `interactive-env` installed as a dependency in a project, you can run it from the `node_modules/.bin` folder.

```
$ ./node_modules/.bin/interactive-env
```

However, I recommend that you add it as an npm script in your `package.json` to make it easier for you and anyone else working on your project.

```
{
  ...
  "scripts": {
    "env": "interactive-env"
    ...
  },
  ...
}
```


```
$ npm run env
```
