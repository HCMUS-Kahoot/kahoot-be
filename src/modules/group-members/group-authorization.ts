import { Injectable } from "@nestjs/common";

@Injectable()
export default class GroupAbility {

  constructor() {
  }
  getPowerIndicator(val) {
    switch (val) {
      case "OWNER":
        return 2
      case "COHOST":
        return 1
      default:
        return 0;
    }
  }
  isAbilityInGroup(user, target): boolean {
    return (
      this.getPowerIndicator(user.role.toUpperCase()) >
      this.getPowerIndicator(target.role.toUpperCase())
    );
  }
}

