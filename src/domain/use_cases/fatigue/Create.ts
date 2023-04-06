import {ID} from '../../entities/common'
import {Fatigue, KssScaleEnum} from '../../entities/fatigue'
import {IFatigueService} from '../../ports/ifatigue_service'

export class Create {
  constructor(private readonly fatigueService: IFatigueService) {}

  async execute(newFatigue: Fatigue, employeeId: ID) {
    if (
      newFatigue.kssScale >= KssScaleEnum.SLEEPY_BUT_NOT_EFFORT_TO_KEEP_ALERT
    ) {
      const createdFatigue = await this.fatigueService.create(
        newFatigue,
        employeeId
      )
      return createdFatigue
    }
  }
}
