'use strict'

var moment = require('moment')

//  Syntax
//  [date or [today|tomorrow|yesterday]:operations...]

var evalExpression = function (expression) {
  var evalRegex = /(\D+)\.([a-zA-Z0-9_\-\/]+)(?:\.(\D+))?/g
  return evalRegex.exec(expression).slice(1)
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

  if (Object.keys(startingPointsMap).indexOf(startingPoint) >= 0) {
    startingPointMoment = startingPointsMap[startingPoint]
  } else {
    startingPointMoment = moment(startingPoint)
  }

  finalMoment = operations.reduce(function (agg, expression) {
    var evaluatedExpression = evalExpression(expression)
    var operation = evaluatedExpression[0]
    var amount = evaluatedExpression[1]
    var type = evaluatedExpression[2]
    if (!agg[operation]) throw `Unknown operation : '${operation}'`
    return agg[operation](amount, type)
  }, startingPointMoment)

  return finalMoment
}
