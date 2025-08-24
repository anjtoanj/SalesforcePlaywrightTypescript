import { authSessionStorage } from "../utils/authSessionStorage";

(async () => {
  await authSessionStorage.generateAuthState();
})();
