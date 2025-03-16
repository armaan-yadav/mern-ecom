import { auth } from "@/config/firebase";
import { customToast } from "@/lib/utils";
import { MessageResponse } from "@/types/apiTypes";
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";

import { User as DbUser } from "../types";

interface UserAuthResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

const userAuthErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "Invalid email or password. Please try again.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/too-many-requests":
    "Too many failed login attempts. Please try again later.",
};
class AuthServices {
  private auth: Auth;
  public server: string;
  constructor() {
    this.auth = auth;
    this.server = import.meta.env.VITE_SERVER_URL;
  }

  async signup({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<UserAuthResponse<User | null>> {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // logn
      await this.updateUserProfile({ displayName: name });
      return {
        success: true,
        data: this.auth.currentUser,
      };
    } catch (error: any) {
      const errorCode = error.code as string;
      const message =
        userAuthErrorMessages[errorCode] ||
        "An error occurred during login. Please try again.";
      customToast(message, { duration: 2000 });
      return { success: false, message, data: null };
    }
  }
  async login({ email, password }: { email: string; password: string }) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      return {
        success: true,
        data: res.user,
      };
    } catch (error: any) {
      const errorCode = error.code as string;
      const message =
        userAuthErrorMessages[errorCode] ||
        "An error occurred during login. Please try again.";
      customToast(message, { duration: 2000 });
      return { success: false, message };
    }
  }
  async signupWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(this.auth, provider);
      return user.user;
    } catch (error) {
      console.error(error);
      customToast("An error occurred during login. Please try again.", {
        duration: 2000,
      });
      return null;
    }
  }

  async updateUserProfile(updatedFields: Partial<User>) {
    try {
      updateProfile(this.auth.currentUser!, updatedFields);
    } catch (error) {
      console.error(error);
      customToast(
        "An error occurred while updating profile. Please try again."
      );
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      return this.auth.currentUser!;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      customToast("logout successfull");
    } catch (error) {
      console.error(error);
      customToast("An error occurred while logging out. Please try again.");
    }
  }

  async getCurrentUserFromDb(
    id: string
  ): Promise<MessageResponse<DbUser> | null> {
    try {
      const user = await fetch(this.server + "/user/" + id);
      if (!user.ok) {
        return null;
      }
      return await user.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async uploadImage(file: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);

      const res = await fetch(this.server + "/user/upload-image", {
        method: "POST",
        body: formData,
        headers: {},
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const { data } = await res.json();
      console.log(data);
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      customToast(
        "An error occurred while uploading the image. Please try again."
      );
      return null;
    }
  }
}

const authServices = new AuthServices();
export default authServices;
