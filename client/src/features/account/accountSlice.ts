import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  isAnyOf,
} from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { User } from "../../app/models/User";
import { history } from "../../";
import { AppDispatch } from "../../app/store/configureStore";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkApi) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) thunkApi.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      if (!error.data) {
        console.log("throwing an error");
        throw error;
      }
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkApi) => {
    thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
      if (basket) thunkApi.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      thunkApi.dispatch(logUserOut());
      return thunkApi.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      console.log("action.payload", action.payload);
      // wil not work when thrown in the corresponding catch...
      throw action.payload;
    });
  },
});

const { signOut, setUser } = accountSlice.actions;

export function logOut() {
  return function (dispatch: AppDispatch) {
    localStorage.removeItem("user");
    history.push("/");
    dispatch(signOut());
  };
}

function logUserOut() {
  return function (dispatch: Dispatch) {
    localStorage.removeItem("user");
    toast.error("Session Expired - please login again");
    history.push("/login");
    dispatch(signOut());
  };
}
