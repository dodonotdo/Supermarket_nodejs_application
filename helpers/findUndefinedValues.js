const strictFindUndefinedValues = (param) => {
  var params = Object.entries(param);
  let len = params.length;
  let undefinedVariable = [];
  for (let i = 0; i < len; i++) {
    let values = params[i];
    var a = values.indexOf(undefined);

    if (a === 1 || values[i] == "") {
      undefinedVariable.push(values[0]);
    }
  }
  return undefinedVariable;
};

const nonStrictFindUndefinedValues = (param) => {
  var params = Object.entries(param);
  let len = params.length;
  let undefinedVariable = [];
  for (let i = 0; i < len; i++) {
    let values = params[i];
    var a = values.indexOf(undefined);
    if (a === 1 )  {
      undefinedVariable.push(values[0]);
    }
  }
  return undefinedVariable;
};

module.exports = {
  strictFindUndefinedValues,
  nonStrictFindUndefinedValues
}