import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppointment } from './create-appointment';
import { getFutureDate } from '../tests/utils/get-future-date';
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointment-repository';

describe('Create Appointment', () => {
  it('should be able to create appointment', () => {
    
    const startAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-11')

    const appointmentRepository = new  InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startAt,
      endsAt,
    })).resolves.toBeInstanceOf(Appointment)
  });

  it('should not be able to create appointment', async () => {
    
    const startAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-15')

    const appointmentRepository = new  InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(
      appointmentRepository
    )
    
    await createAppointment.execute({
      customer: 'John Doe',
      startAt,
      endsAt,
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-17')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startAt: getFutureDate('2022-08-11'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error)
  });
});