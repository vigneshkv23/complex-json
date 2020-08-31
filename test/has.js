var modifyJson = require("../index");

// returns boolean
// object accepted object object and object arrays
var json = {
    "a": {
        "b": "value"
    }
}
var key = 'b';
var res = modifyJson.has(json, key)
console.log("single value without duplicate keys---", res);

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

// parentObj is non-mandatory, if key has same name is other object parentObj
var keys = "f";
var parentObj = "e";
var res = modifyJson.has(json, keys, parentObj);
console.log("has single value----", res);
