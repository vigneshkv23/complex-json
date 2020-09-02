var modifyJson = require("../index");

// returns value
// object accepted object object and object arrays
var json = {
    "a": {
        "b": "value"
    }
}
var key = 'b';
var res = modifyJson.get(json, key)
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
                                "f": "value"
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
var res = modifyJson.get(json, keys, parentObj);
console.log("get single value----", JSON.stringify(res));


var json={
    "a": {
        "b":[ {
            "c":"value",
            "d":"val"
        }],
        "b1": [{
            "c":"value",
            "d":"val"
        }]
        }
    }

    // parentObj is non-mandatory, if key has same name is other object parentObj
var keys = "c";
var parentObj = "b";
var res = modifyJson.get(json, keys, parentObj);
console.log("get single value----", JSON.stringify(res));

