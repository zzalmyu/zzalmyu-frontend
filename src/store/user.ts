import { atom } from "jotai";
import { UserInformation } from "@/types/user";

export const $userInformation = atom<UserInformation>({
  userId: 0,
  email: "",
  role: "GUEST",
});
