import { setupServer } from "msw/node";
import { handler } from "./handlers";

export const server = setupServer(...handler);
