<h1 align="center">Welcome to complex-json 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="--" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/vigneshkv23" target="_blank">
    <img alt="Twitter: vigneshkv23" src="https://img.shields.io/twitter/follow/vigneshkv23.svg?style=social" />
  </a>
</p>

> Access the deep objects inside an object with ease.

### 🏠 [Homepage](--)

### ✨ [Demo](--)

## Install

```sh
npm install complex-json -save
```

## Usage

```sh
var complexJson = require('complex-json');
## GET:
returns value
  
```var json = {
        "a": {
            "b": "value"
            }
        }
var key = 'b';
var res = complexJson.get(json, key)

var json = {
    "a": {
        "b": {
            "c": {
                "d": [
                    {
                        "e": {
                            "f": "value"
                        },
                        "e1": [
                            {
                                "f": "value"
                            }
                        ]
                    }]
            }
        }
    }
}

note:parentObj is non-mandatory, if key has same name is other object parentObj
var keys = "f";
var parentObj = "e";
var res = complexJson.get(json, keys, parentObj);
 ```
## SET
 ```
var json = {
    "a": {
        "b": "value"
    }
}

var key = 'b';
var valueToReplace = 'newValue';
var res = complexJson.set(json, key, valueToReplace);

var json = {
    "a": {
        "b": {
            "c": {
                "d": [
                    {
                        "e": {
                            "f": "value"
                        },
                        "e1": [
                            {
                                "f1": "value"
                            }
                        ]
                    }]
            }
        }
    }
}

// set single value
note: parentObj is non-mandatory, if key has same name is other object

var keys = "f";
var valueToReplace = "sucess"
var parentObj = "e";

var res = complexJson.set(json, keys, valueToReplace, parentObj);

// set multiple value at a time
// array length of keys, valueToReplace, parentObj should be same
// all the params are mandatory incase of setting multiple values at a time

var keys = ["f", "f1"];
var valueToReplace = ["new f value", "new f1 value"]
var parentObj = ["e", "e1"];
var res = complexJson.set(json, keys, valueToReplace, parentObj);
 ```
 ## DELETE
 ```
returns modified JSON

var json = {
    "a": {
        "b": "value",
        "c": "value",
    }
}

var key = 'b';
var res = complexJson.del(json, key);

var json = {
    "a": {
        "b": {
            "c": {
                "d": [
                    {
                        "e": {
                            "f": "value",
                            "g": "value"
                        },
                        "e1": [
                            {
                                "f1": "value"
                            }
                        ]
                    }]
            }
        }
    }
}

// del single value
note:parentObj is non-mandatory, if key has same name is other object parentObj
var keys = "f";
var parentObj = "e";
var res = complexJson.del(json, keys, parentObj);
 ```
 ## HAS
 ```
returns boolean

var json = {
    "a": {
        "b": "value"
    }
}

var key = 'b';
var res = complexJson.has(json, key);

var json = {
    "a": {
        "b": {
            "c": {
                "d": [
                    {
                        "e": {
                            "f": "value"
                        },
                        "e1": [
                            {
                                "f1": "value"
                            }
                        ]
                    }]
            }
        }
    }
}

note: parentObj is non-mandatory, if key has same name is other object
var keys = "f";
var parentObj = "e";
var res = complexJson.has(json, keys, parentObj);
 ```
 ## GETPATH
 ```
returns path array 

var json = {
    "a": {
        "b": "value"
    }
}

var key = 'b';
var res = complexJson.getPath(json, key);

var json = {
    "a": {
        "b": {
            "c": {
                "d": [
                    {
                        "e": {
                            "f": "value"
                        },
                        "e1": [
                            {
                                "f": "value"
                            }
                        ]
                    }]
            }
        }
    }
}

note: parentObj is non-mandatory, if key has same name is other object parentObj
var keys = "f";
var parentObj = "e1";
var res = complexJson.getPath(json, keys, parentObj);
```

## Author

👤 **vignesh**

* Twitter: [@vigneshkv23](https://twitter.com/vigneshkv23)
* Github: [@vigneshkv23](https://github.com/vigneshkv23)
* LinkedIn: [@vigneshkv23](https://linkedin.com/in/vigneshkv23)

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/vigneshkv23">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_