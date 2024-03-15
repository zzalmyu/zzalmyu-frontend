import { atom } from "jotai";
import { UserInfo } from "@/types/user";

export const $userInfo = atom<UserInfo>({
  userId: 0,
  email: "",
  role: "GUEST",
});
