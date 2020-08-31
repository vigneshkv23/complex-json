var modifyJson = require("../index");

// del value 
// returns modified JSON
// object accepted object object and object arrays
var json = {
    "a": {
        "b": "value",
        "c": "value",
    }
}
var key = 'b';
var res = modifyJson.del(json, key)
console.log("single value without duplicate keys---", res);

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
// del value string
// parentObj is non-mandatory, if key has same name is other object parentObj
var keys = "f";
var parentObj = "e";
var res = modifyJson.del(json, keys, parentObj);
console.log("del single value----", JSON.stringify(res));
