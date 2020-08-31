var modifyJson = require("../index");

// set value 
// returns modified JSON
// object accepted object object and object arrays
var json = {
    "a": {
        "b": "value"
    }
}
var key = 'b';
var valueToReplace = 'newValue';
var res = modifyJson.set(json, key, valueToReplace)
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

// set single value
// set value string
// parentObj is non-mandatory, if key has same name is other object parentObj
var keys = "f";
var valueToReplace = "sucess"
var parentObj = "e";
var res = modifyJson.set(json, keys, valueToReplace, parentObj);
console.log("set single value----", JSON.stringify(res));

// set multiple value at a time
// array length of keys, valueToReplace, parentObj should be same
// all the params are mandatory incase of setting multiple values at a time
var keys = ["f", "f1"];
var valueToReplace = ["new f value", "new f1 value"]
var parentObj = ["e", "e1"];
var res = modifyJson.set(json, keys, valueToReplace, parentObj);
console.log("set multiple value----", JSON.stringify(res));
// ---------------------------------------------------------------------set ends