'use strict'

const { assert } = require('chai')
const dateExp = require('../src/index')

describe('Basic operations', () => {

  it('operation: add', () => {
    const initDate = '2017-08-25'
    const operation = `${initDate}:add.1.day`
    const exp = dateExp(operation)
    assert.equal('2017-08-26', exp.format('YYYY-MM-DD'))
  })

  it('operation: subtract', () => {
    const initDate = '2017-08-25'
    const operation = `${initDate}:subtract.1.day`
    const exp = dateExp(operation)
    assert.equal('2017-08-24', exp.format('YYYY-MM-DD'))
  })

  it('chaining operations', () => {
    const initDate = '2017-08-25'
    const operation = `${initDate}:add.1.day:subtract.1.day`
    const exp = dateExp(operation)
    assert.equal('2017-08-25', exp.format('YYYY-MM-DD'))
  })

})
