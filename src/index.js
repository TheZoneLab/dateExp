var moment = require('moment')

//  Syntax
//  [date or [today|tomorrow|yesterday]:operations...]

var evalExpression = function (expression) {
  var evalRegex = /(\D+)\.(\d+)\.(\D+)/g
  var [full, operation, amount, type] = evalRegex.exec(expression)
  return [operation, amount, type]
}

module.exports = function (string) {
  var startingPointsMap = {
    'today': moment(),
    'tomorrow': moment().add(1, 'day'),
    'yesterday': moment().subtract(1, 'day')
  }

  var [startingPoint, ...operations] = string.split(':')

  let startingPointMoment
  let finalMoment

  if (Object.keys(startingPointsMap).includes(startingPoint)) {
    startingPointMoment = startingPointsMap[startingPoint]
  } else {
    startingPointMoment = moment(startingPoint)
  }

  finalMoment = operations.reduce(function (agg, expression) {
    var [operation, amount, type] = evalExpression(expression)
    return agg[operation](amount, type)
  }, startingPointMoment)

  return finalMoment
}
