const PowerIndicator = ["USER", "CO-OWNER", "OWNER"];

export default class GroupAbility {

  powerIndicator: any;
  constructor() {
    this.powerIndicator = Object.assign({}, PowerIndicator)
  }

  isAbilityInGroup(user, target): boolean {
    return this.powerIndicator[user.role] > this.powerIndicator[target.role];
  }
}

