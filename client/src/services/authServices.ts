import { auth } from "@/config/firebase";
import { customToast } from "@/lib/utils";
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

interface AuthResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

const authErrorMessages: Record<string, string> = {
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
  constructor() {
    this.auth = auth;
  }

  async signup({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResponse<User | null>> {
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
        authErrorMessages[errorCode] ||
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
        authErrorMessages[errorCode] ||
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
}

const authServices = new AuthServices();
export default authServices;
