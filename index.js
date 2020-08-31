
// set,get,has,del
'use strict'
//returns path ARRAY
exports.getPath = function (obj, key, parentObj) {
  var res = getAllMatchingPath(obj, key);
  if (parentObj != undefined || parentObj != null) {
    var result = getSelectedPath(res, parentObj);
    return getArrayPath(result);
  } else {
    return getArrayPath(res);
  }

}

//COMPLEX JSON STARTS
// JSON value replace
exports.set = function (json, keys, values, parentObj) {
  if (Array.isArray(keys) && Array.isArray(values) && Array.isArray(parentObj)) {
    keys.map(function (key, index) {
      var res = getAllMatchingPath(json, key);
      var result = getSelectedPath(res, parentObj[index]);
      var formattedRes = getArrayPath(result);
      valueReplace(json, formattedRes, values[index]);
    })
    return json;
  }
  else if ((Array.isArray(keys) || Array.isArray(values) || Array.isArray(parentObj)) == false) {
    var res = getAllMatchingPath(json, keys);
    if (parentObj != undefined) {
      var result = getSelectedPath(res, parentObj);
      var formattedRes = getArrayPath(result);
    } else {
      var formattedRes = getArrayPath(res);
    }
    valueReplace(json, formattedRes, values);
    return json;
  }
  else {
    console.log("JSON key values should be either Array or String");
  }
}
// JSON value replace

//returns boolean
exports.has = function (obj, key, parentObj) {
  var a;
  var res = getAllMatchingPath(obj, key);
  var formattedRes = getArrayPath(res);
  if (formattedRes.length == 0) {
    return false;
  }
  if (formattedRes.length > 1 && parentObj == undefined) {
    return "more than one path found, provide an another unique object"
  }
  if (parentObj != undefined) {
    var result = getSelectedPath(res, parentObj);
    var formattedRes = getArrayPath(result);
    if (formattedRes.length == 0) {
      return false;
    }
  }
  else {
    var merged = formattedRes;
  }
  var merged = [].concat.apply([], formattedRes);

  merged.map(function (o) {
    (o == key) ? a = true : a = false;
  });
  return a
};

// get value
exports.get = function (obj, key, parentObj) {
  var res = getAllMatchingPath(obj, key);
  var formattedRes = getArrayPath(res);
  if (formattedRes.length == 0) {
    return "key not found";
  }
  if (parentObj == undefined) {
    if (formattedRes.length == 0) {
      return "key not found";
    }
    var res = getAll(obj, formattedRes);
    return res

  }
  if (parentObj != undefined) {
    var result = getSelectedPath(res, parentObj);
    getArrPath = getArrayPath(result);
    merged = [].concat.apply([], getArrPath);
    for (var i = 0; i < merged.length; i++) {
      if (i < merged.length - 1) {
        obj = obj[merged[i]];
      }
      else {
        return obj[merged[i]]
      }
    };
  }

};

// JSON value replace
exports.del = function (json, keyToDelete, parentObj) {
  if (typeof (keyToDelete) === "string") {
    var res = getAllMatchingPath(json, keyToDelete);
    if (res.length == 0) {
      console.log("key not found");
      return undefined
    }
    var result = getSelectedPath(res, parentObj);
    if (result.length > 1 && parentObj == undefined) {
      console.log("more than one key found, provide parentObj");
      return undefined
    }
    if (result.length == 1 && parentObj == undefined) {
      var formattedRes = getArrayPath(result);
      jsonKeyDelete(json, formattedRes);
      return json;
    }
    if (parentObj != undefined) {
      var formattedRes = getArrayPath(result);
      jsonKeyDelete(json, formattedRes);
      return json;
    }
  }
  else {
    console.log("JSON key & parentObj should be String");
    return undefined
  }
}

// Filtering the path based on condition
// returns path array
function getSelectedPath(obj, parentObj) {
  var matchedPath = [];
  obj.forEach(function (data, index) {
    if (parentObj == undefined || parentObj == null) {
      matchedPath.push(obj[index]);
    }
    if ((data.includes(parentObj + "/"))) {
      matchedPath.push(obj[index]);
    }

  });
  return matchedPath
}


// Replaces the JSON value
function valueReplace(obj, path, newvalue) {
  path.forEach(function (val, index) {
    updateAt(obj, path[index], newvalue);
  });
}

// Finding and replacing the value
function updateAt(obj, path, newvalue) {
  for (var i = 0; i < path.length; i++) {
    if (i < path.length - 1) {
      obj = obj[path[i]];
    }
    else {
      obj[path[i]] = newvalue;
    }
  }
}

// Constructs path to array format
// returns path array
function getArrayPath(path) {
  var arrayPath = [];
  path.forEach(function (jsonData, index) {
    var a = [];
    var res = path[index].split("/");
    arrayPath.push(res);
  });
  return arrayPath;
}

function getAllMatchingPath(obj, key, maxDepth, currentDepth) {
  maxDepth = (maxDepth || maxDepth == 0) ? maxDepth : 20;
  currentDepth = currentDepth ? currentDepth : 1;
  if (currentDepth > maxDepth) {
    return [];
  } else {
    var charSeparator = "/";
    var paths = [];
    var i = 0;
    for (var curr in obj) {
      var currElem = obj[curr];
      if (curr === key) {
        paths.push(curr);
      }
      if (typeof currElem == "object") {
        var deepPaths = getAllMatchingPath(currElem, key, maxDepth, currentDepth + 1);
        for (var e = 0; e < deepPaths.length; e++) {
          paths.push(curr + charSeparator + deepPaths[e]);
        }
      } else {
        if (currElem === key) {
          paths.push(curr);
        }
      }
      i++;
    }

    return paths;
  }
}



// complete array to be passes and res will
function getAll(obj, path) {
  var valueArr = [];
  path.forEach(function (val, index) {
    valueArr.push(getAt(obj, path[index]));
  });
  return valueArr;
}

// Finding and replacing the value
function getAt(obj, path) {
  for (var i = 0; i < path.length; i++) {
    if (i < path.length - 1) {
      obj = obj[path[i]];
    }
    else {
      return obj[path[i]];
    }
  }
}


function jsonKeyDelete(obj, path) {
  path.forEach(function (val, index) {
    deleteAt(obj, path[index]);
  });
}

// Finding and replacing the value
function deleteAt(obj, path) {
  for (var i = 0; i < path.length; i++) {
    if (i < path.length - 1) {
      obj = obj[path[i]];
    }
    else {
      delete obj[path[i]];
    }
  }
}
