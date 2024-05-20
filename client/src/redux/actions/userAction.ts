import axios from "axios";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
} from "../reducers/userSlice";
import { toast } from "react-toastify";
import { User } from "../reducers/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { baseURL } from "../../../../server/utils/url";

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`${baseURL}/auth/getuser`, {
      withCredentials: true,
    });
    dispatch(LoadUserSuccess(data.user));
  } catch (error: any) {
    dispatch(LoadUserFail(error.response.data.message));
  }
};
