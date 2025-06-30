import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // singup
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      ); // what the value we have to pass.... enter in the create()
      if (userAccount) {
        // this conditon when the user succesfully register
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      if (error.code === 409) {
        alert(
          "This email is already registered. Please sign in or use another email."
        );
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  }

  //singin
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // check for Login
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null;
  }

  //logout
  async logout() {
    try {
      // return await this.account.deleteSession('current');  //<<- for one session
      return await this.account.deleteSessions(); // <<- for all session
    } catch (error) {
      console.log("Appwrite Service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
