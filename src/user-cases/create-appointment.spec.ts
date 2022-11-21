import { describe,expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppointment } from './create-appointment';
import { getFutureDate } from '../tests/utils/get-future-date';

describe('Create Appointment', () => {
  it('should be able to create appointment', () => {
    
    const startAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-11')
    const createAppointment = new CreateAppointment()

    expect(createAppointment.execute({
      customer: 'John Doe',
      startAt,
      endsAt,
    })).resolves.toBeInstanceOf(Appointment)
  });
});