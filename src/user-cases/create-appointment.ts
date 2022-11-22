import { Appointment } from '../entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository';

interface CreateAppointmentRequest {
  customer: String;
  startAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  constructor(
    private appointmentRepository: AppointmentRepository
  ) { }
  
  async execute ({
    customer,
    startAt,
    endsAt
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(
      startAt,
      endsAt
    )

    if (overlappingAppointment) {
      throw new Error ('Another appointment overlaps this appointment')
    }

    const appointment = new Appointment({
      customer,
      startAt,
      endsAt
    })

    await this.appointmentRepository.create(appointment)
    
    return appointment
  } 
}