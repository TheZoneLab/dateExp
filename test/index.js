'use strict'

const { assert } = require('chai')
const dateExp = require('../src/index')
const moment = require('moment')

const dateWithDayOffset = (offset) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return moment(date)
}

const TEST_CASES = [
  // Static cases
  ['today', () => moment()],
  ['tomorrow', () => dateWithDayOffset(1)],
  ['yesterday', () => dateWithDayOffset(-1)],
  // Add cases
  ['today:add.1.days', () => dateWithDayOffset(1)],
  ['tomorrow:add.1.days', () => dateWithDayOffset(2)],
  ['yesterday:add.1.days', () => moment()],
  // Substract cases
  ['today:subtract.1.days', () => dateWithDayOffset(-1)],
  ['tomorrow:subtract.1.days', () => moment()],
  ['yesterday:subtract.1.days', () => dateWithDayOffset(-2)]
]

describe('DateExp', () => {
  describe('Standard cases', () => {

    for (var i = 0; i < TEST_CASES.length; i++) {
      const [expression, expected] = TEST_CASES[i]
      it(`Should generate a date from '${expression}'`, () => {
        const expectedDate = expected()
        assert.equal(dateExp(expression).year(), expectedDate.year())
        assert.equal(dateExp(expression).month(), expectedDate.month())
        assert.equal(dateExp(expression).date(), expectedDate.date())
      })
    }

  })

  describe('Format cases', () => {

    const FORMAT_CASES = [
      'YYYY/MM/DD',
      'YYYY-MM-DD',
      'YYYY_MM_DD',
      '\'YYYY.MM.DD\''
    ]
    for (var j = 0; j < FORMAT_CASES.length; j++) {
      describe(`Testing date format : "${FORMAT_CASES[j]}"`, () => {
        const DATE_FORMAT = FORMAT_CASES[j]
        for (var i = 0; i < TEST_CASES.length; i++) {
          const [expression, expected] = TEST_CASES[i]
          const expectedString = expected().format((FORMAT_CASES[j].startsWith('\'')) ? FORMAT_CASES[j].substr(1, FORMAT_CASES[j].length - 2) : FORMAT_CASES[j])
          const expressionWithFormat = expression + ':format.' + DATE_FORMAT
          it(`Should format "${expressionWithFormat}" to '${expectedString}'`, () => {
            assert.equal(dateExp(expressionWithFormat), expectedString)
          })
        }
      })
    }
  })

})
