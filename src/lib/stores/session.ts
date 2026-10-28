import { PersistedState } from "runed";

type AdminStore = {
  password?: string,
}

export const adminStore = new PersistedState<AdminStore>("legitidevs.admin", {}, {
	storage: "session"
});