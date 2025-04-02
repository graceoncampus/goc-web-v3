import { signOut } from "aws-amplify/auth";
import { makeAutoObservable } from "mobx";

export class User {
  name = "";
  family_name = "";
  address = "";
  gradYear = "";
  email = "";
  phone_number = "";

  constructor() {
    makeAutoObservable(this);
  }

  setName(name: string) {
    this.name = name;
  }

  setFamilyName(family_name: string) {
    this.family_name = family_name;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setGradYear(gradYear: string) {
    this.gradYear = gradYear;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPhoneNumber(phone_number: string) {
    this.phone_number = phone_number;
  }

  setUserData(userData: {
    name?: string;
    family_name?: string;
    address?: string;
    gradYear?: string;
    email?: string;
    phone_number?: string;
  }) {
    if (userData.name !== undefined) this.name = userData.name;
    if (userData.family_name !== undefined) this.family_name = userData.family_name;
    if (userData.address !== undefined) this.address = userData.address;
    if (userData.gradYear !== undefined) this.gradYear = userData.gradYear;
    if (userData.email !== undefined) this.email = userData.email;
    if (userData.phone_number !== undefined) this.phone_number = userData.phone_number;
  }

  clear() {
    this.name = "";
    this.family_name = "";
    this.address = "";
    this.gradYear = "";
    this.email = "";
    this.phone_number = "";
  }

  // async login() {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();
  //     const attributes = user.attributes;
  //     this.setUserData({
  //       name: attributes.given_name || "",
  //       family_name: attributes.family_name || "",
  //       email: attributes.email || "",
  //       phone_number: attributes.phone_number || "",
  //       address: attributes.address || "",
  //       gradYear: attributes["custom:gradYear"] || "",
  //     });
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // }

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
