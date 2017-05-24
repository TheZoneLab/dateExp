var moment = require('moment')

//  Syntax
//  [date or [today|tomorrow|yesterday]:operations...]

var evalExpression = function (expression) {
  var evalRegex = /(\D+)\.(\d+)\.(\D+)/g
  var executedRegex = evalRegex.exec(expression)
  var operation = executedRegex[1]
  var amount = executedRegex[2]
  var type = executedRegex[3]
  return [operation, amount, type]
}

module.exports = function (string) {
  var startingPointsMap = {
    'today': moment(),
    'tomorrow': moment().add(1, 'day'),
    'yesterday': moment().subtract(1, 'day')
  }

  var operations = string.split(':')
  var startingPoint = operations.shift()

  var startingPointMoment
  var finalMoment

  if (Object.keys(startingPointsMap).includes(startingPoint)) {
    startingPointMoment = startingPointsMap[startingPoint]
  } else {
    startingPointMoment = moment(startingPoint)
  }

  finalMoment = operations.reduce(function (agg, expression) {
    var evaluatedExpression = evalExpression(expression)
    var operation = evaluatedExpression[0]
    var amount = evaluatedExpression[1]
    var type = evaluatedExpression[2]
    return agg[operation](amount, type)
  }, startingPointMoment)

  return finalMoment
}
