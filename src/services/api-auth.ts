import axios from "axios";

import { getAuthApiUrl } from "../util/envVars";

const authApiUrl = getAuthApiUrl();

export async function apiSignup(body: { email: string; password: string }) {
  return axios.post(`${authApiUrl}/signup`, body);
}

export async function apiSignin(body: { idToken: string }) {
  return axios.post(`${authApiUrl}/signin`, body);
}
