const strictFindUndefinedValues = (param) => {
  var params = Object.entries(param);
  let len = params.length;
  let undefinedVariable = [];
  for (let i = 0; i < len; i++) {
    let values = params[i];
    var a = values.indexOf(undefined);
    var b = params[i][1] == undefined ? undefined : params[i][1].replace(/\s+/g, '').trim()
    if (a === 1 || b == "") {
      undefinedVariable.push(values[0]);
    }
  }
  return undefinedVariable;
};


function nonStrictfindUndefinedValues(param) {
  var params = Object.entries(param);
  let len = params.length;
  let undefinedVariable = [];
  for (let i = 0; i < len; i++) {
    let values = params[i];
    var a = values.indexOf(undefined);
    if (a === 1) {
      let and = undefinedVariable.push(values);
    }
  }
  return undefinedVariable;
}

module.exports = {
  strictFindUndefinedValues,
  nonStrictfindUndefinedValues
}
