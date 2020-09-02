<h1 align="center">Welcome to complex-json 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.4-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/vigneshkv23/complex-json/blob/master/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/vigneshkv23" target="_blank">
    <img alt="Twitter: vigneshkv23" src="https://img.shields.io/twitter/follow/vigneshkv23.svg?style=social" />
  </a>
</p>

> Access the deep objects inside an object with ease.

## Install

```sh
npm install complex-json -save
```

## Api

```sh
get - returns value
set - returns JSON
del - returns JSON
has - returns Boolean 
getPath - returns path in array format
```

## Usage:
```javascript
var json = {
        "a": {
            "b": [{
                "c":"value",
                "d":"val"
            }],
            "b1": [{
                "c":"value",
                "d1":"val"
            }]
            }
        }
        
var complexJson = require('complex-json');  

// If key is duplicate in any section,It is mandatory pass the third param which is the parent key     
// If parent key is not passed & duplicate key is present-returns undefied
complexJson.set(json, 'c', 'newValue' ,'b'); // returns modified json 

//set accepts key,value in array-can be used to set/change multiple keys at a time
var keys=['c','d1'];
var values=['new-c-value','new-d1-value']
var parentKeys=['b','b1']
complexJson.set(json, keys, values ,parentKeys); // returns modified json 

complexJson.has(json, 'c' ,'b'); // returns true
complexJson.del(json, 'c' ,'b'); // returns modified json
// If parentKey passed returns specific value/path, If not returns every matched value/path
complexJson.get(json, 'c', 'b'); // returns 'value'
complexJson.getPath(json, 'c' ,'b'); // returns array 
```

## Author

👤 **vignesh**

* Twitter: [@vigneshkv23](https://twitter.com/vigneshkv23)
* Github: [@vigneshkv23](https://github.com/vigneshkv23)
* LinkedIn: [@vigneshkv23](https://linkedin.com/in/vigneshkv23)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/vigneshkv23/complex-json/issues). 

## Show your support

Give a ⭐️ if this project helped you!

***
complex-json developed with ❤️
