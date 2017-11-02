'use strict'

var moment = require('moment')

//  Syntax
//  [date or [today|tomorrow|yesterday]:operations...]

var evalExpression = function (expression) {
  var evalRegex = /('[^']+'|[^\.]+)/g
  var current, results = []
  while (current = evalRegex.exec(expression)) {
    if (current[0].startsWith('\'') && current[0].endsWith('\'')) {
      results.push(current[0].substr(1, current[0].length - 2))
    } else {
      results.push(current[0])
    }
  }
  return results
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
