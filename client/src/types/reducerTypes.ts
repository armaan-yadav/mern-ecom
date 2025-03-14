import { User } from ".";

export interface UserReducerInitalState {
  user: User | null;
  loading: boolean;
}
