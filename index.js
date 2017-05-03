const moment = require('moment')

//  Syntax
//  [date or [today|tomorrow|yesterday]:operations...]

const evalExpression = (expression) => {
  const evalRegex = /(\D+)\.(\d+)\.(\D+)/g
  console.log(evalRegex, expression)
  const [full, operation, amount, type] = evalRegex.exec(expression)
  return [operation, amount, type]
}

module.exports = function (string) {
  const startingPointsMap = {
    'today': moment(),
    'tomorrow': moment().add(1, 'day'),
    'yesterday': moment().subtract(1, 'day')
  }

  const [startingPoint, ...operations] = string.split(':')

  let startingPointMoment
  let finalMoment

  if (Object.keys(startingPointsMap).includes(startingPoint)) {
    startingPointMoment = startingPointsMap[startingPoint]
  } else {
    startingPointMoment = moment(startingPoint)
  }
  
  finalMoment = operations.reduce((agg, expression) => {
    const [operation, amount, type] = evalExpression(expression)
    return agg[operation](amount, type)
  }, startingPointMoment)

  return finalMoment
}

console.log(module.exports('today:add.1.day:subtract.2.days'))