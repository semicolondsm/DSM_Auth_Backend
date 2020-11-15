
# Typescript Typings for [serve-static](https://www.npmjs.com/package/serve-static)

[![Greenkeeper badge](https://badges.greenkeeper.io/types/npm-serve-static.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/types/npm-serve-static.svg?branch=master)](https://travis-ci.org/types/npm-serve-static)

## Installation
```sh
typings install --save serve-static
```
or
```
npm install types/npm-express#<commit hash>
```

## Usage

```ts
import express = require('express');
import serveStatic = require('serve-static');
 
const app = express();
 
app.use(serveStatic('public/ftp', {index: ['default.html', 'default.htm']}));
app.listen(3000);
```

---------------------------------------

_Based on the typings by [Uros Smolnik](https://github.com/urossmolnik) on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)_
