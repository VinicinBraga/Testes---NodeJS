import { expect, test } from 'vitest';
import { Appointment } from './appointment';
import { getFutureDate } from '../tests/utils/get-future-date';

test('create an appointment', () => {
  const startAt = getFutureDate('2022-08-10')
  const endsAt = getFutureDate('2022-08-11')
  
  const appointment = new Appointment({
    customer: 'John Doe',
    startAt,
    endsAt,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
})

test('no end before start', () => {
  const startAt = getFutureDate('2022-08-10')
  const endsAt = getFutureDate('2022-08-09')

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startAt,
      endsAt,
    })
  }).toThrow
})

test('no start before now', () => {
  const startAt = getFutureDate('2022-08-10')
  const endsAt = getFutureDate('2022-08-09')

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startAt,
      endsAt,
    })
  }).toThrow
})
