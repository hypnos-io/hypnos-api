import {User} from '../../entities/user'
import {ISupervisorService} from '../../ports/isupervisor_service'
import {RolesEnum} from '../authorization/roles'

export class Create {
  constructor(private readonly supervisorService: ISupervisorService) {}

  async execute(
    newUser: Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'role' | 'imageURL'>
  ) {
    const {name, password, registration} = newUser
    const foundSupervisor = await this.supervisorService.findByRegistration(
      registration
    )
    if (foundSupervisor) return foundSupervisor
    return this.supervisorService.create({
      name,
      password,
      registration,
      role: RolesEnum.ADMIN,
    })
  }
}
