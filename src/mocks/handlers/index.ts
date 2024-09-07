import { authHandlers } from "./authHandlers";
import { chatHandlers } from "./chatHandlers";
import { reportHandlers } from "./reportHandlers";
import { TagHandlers } from "./tagHandlers";
import { zzalHandlers } from "./zzalHandlers";

export const handler = [
  ...TagHandlers,
  ...zzalHandlers,
  ...reportHandlers,
  ...chatHandlers,
  ...authHandlers,
];
