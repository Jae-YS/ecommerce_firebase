import "@testing-library/jest-dom";
import "whatwg-fetch";

import { TextEncoder, TextDecoder } from "util";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

jest.mock("./src/firebaseConfig", () => ({
  auth: {},
  db: {},
}));
