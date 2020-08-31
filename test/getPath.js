var modifyJson = require("../index");

// returns path array 
// object accepted object object and object arrays
var json = {
    "a": {
        "b": "value"
    }
}
var key = 'b';
var res = modifyJson.getPath(json, key)
console.log("single value---", res);

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

// return path array
// getPath value string
// parentObj is non-mandatory, if key has same name is other object parentObj
var keys = "f";
var parentObj = "e1";
var res = modifyJson.getPath(json, keys, parentObj);
console.log("getPath single value----", JSON.stringify(res));
