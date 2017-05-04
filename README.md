# DateExp

A simple module for serializable dynamic dates

[![Build Status](https://travis-ci.org/starvey/dateExp.svg?branch=master)](https://travis-ci.org/starvey/dateExp)

## Usage
`dateExp("startingPoint:...operations")`

### Starting points
This is the starting point on which following operations will work on
- `today`
- `tomorrow`
- `yesterday`
- Valid momentjs date string

### Operations
Operations are a `:` delimited list of operations to execute on the starting point.
They follow the following format: `operation.amount.type`

#### Operation
- add
- subtract

#### Amount
- Any integer

#### Type
- Any type supported by moment (eg.: day, days, month, year...)

## Example

```
dateExp('today:add.1.day:subtract.2.days')
# Return moment date : today - 1 day
```
