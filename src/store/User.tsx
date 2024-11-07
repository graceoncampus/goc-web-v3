import { signOut } from "aws-amplify/auth";
import { action, makeAutoObservable } from "mobx";

export class User {
  name = "";
  family_name = "";
  address = "";
  gradYear = "";
  email = "";
  phone_number = "";
  groups: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setName(name: string) {
    this.name = name;
  }

  setGroups(groups: string[]) {
    this.groups = groups;
  }

  clear() {
    this.name = "";
    this.family_name = "";
    this.address = "";
    this.gradYear = "";
    this.email = "";
    this.phone_number = "";
    this.groups = [];
  }

  @action
  async logout() {
    try {
      await signOut();
      this.clear();
    } catch (error) {
      console.log("error signing out:", error);
    }
  }

  isLoggedIn() {
    return this.name !== "";
  }
}

export const userStore = new User();
