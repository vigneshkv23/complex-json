// set,get,has,del
//returns path ARRAY
exports.getPath = function (obj, key, parentKey) {
  var res = getAllMatchingPath(obj, key);
  if (parentKey != undefined || parentKey != null) {
    var result = getSelectedPath(res, parentKey);
    return getArrayPath(result);
  } else {
    return getArrayPath(res);
  }
};

//COMPLEX JSON STARTS
// JSON value replace
exports.set = function (json, keys, values, parentKey) {
  var formattedRes, res, result;
  if (Array.isArray(keys) && Array.isArray(values) && Array.isArray(parentKey)) {
    keys.map(function (key, index) {
      res = getAllMatchingPath(json, key);
      result = getSelectedPath(res, parentKey[index]);
      formattedRes = getArrayPath(result);
      valueReplace(json, formattedRes, values[index]);
    })
    return json;
  }
  else if ((Array.isArray(keys) || Array.isArray(values) || Array.isArray(parentKey)) == false) {
    res = getAllMatchingPath(json, keys);
    if (parentKey != undefined) {
      result = getSelectedPath(res, parentKey);
      formattedRes = getArrayPath(result);
    } else {
      formattedRes = getArrayPath(res);
    }
    valueReplace(json, formattedRes, values);
    return json;
  }
  else {
    console.log("JSON key values should be either Array or String");
  }
};

//returns boolean
exports.has = function (obj, key, parentKey) {
  var a, formattedRes, res, result, merged;
  res = getAllMatchingPath(obj, key);
  formattedRes = getArrayPath(res);
  if (formattedRes.length == 0) {
    return false;
  }
  if (formattedRes.length > 1 && parentKey == undefined) {
    console.log("more than one path found, provide an another unique object");
    return undefined
  }
  if (parentKey != undefined) {
    result = getSelectedPath(res, parentKey);
    formattedRes = getArrayPath(result);
    if (formattedRes.length == 0) {
      return false;
    }
  }
  else {
    merged = formattedRes;
  }
  merged = [].concat.apply([], formattedRes);

  merged.map(function (o) {
    (o == key) ? a = true : a = false;
  });
  return a
};

// get value
exports.get = function (obj, key, parentKey) {
  var res, formattedRes;
  res = getAllMatchingPath(obj, key);
  console.log(res);
  formattedRes = getArrayPath(res);
  if (formattedRes.length == 0) {
    return "key not found";
  }
  if (parentKey == undefined) {
    if (formattedRes.length == 0) {
      return "key not found";
    }
    res = getAll(obj, formattedRes);
    return res

  }
  if (parentKey != undefined) {
    var result = getSelectedPath(res, parentKey);
    var getArrPath = getArrayPath(result);
    var merged = [].concat.apply([], getArrPath);
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
exports.del = function (json, keyToDelete, parentKey) {
  if (typeof (keyToDelete) === "string") {
    var formattedRes, res, result;
    res = getAllMatchingPath(json, keyToDelete);
    if (res.length == 0) {
      console.log("key not found");
      return undefined
    }
    result = getSelectedPath(res, parentKey);
    if (result.length > 1 && parentKey == undefined) {
      console.log("more than one key found, provide parentKey");
      return undefined
    }
    if (result.length == 1 && parentKey == undefined) {
      formattedRes = getArrayPath(result);
      jsonKeyDelete(json, formattedRes);
      return json;
    }
    if (parentKey != undefined) {
      formattedRes = getArrayPath(result);
      jsonKeyDelete(json, formattedRes);
      return json;
    }
  }
  else {
    console.log("JSON key & parentKey should be String");
    return undefined
  }
};

// Filtering the path based on condition
// returns path array
function getSelectedPath(obj, parentKey) {
  var matchedPath = [];
  obj.forEach(function (data, index) {
    if (parentKey == undefined || parentKey == null) {
      matchedPath.push(obj[index]);
    }
    if ((data.includes(parentKey + "/"))) {
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
