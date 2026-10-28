import { createContext } from "svelte"

export type TabContainer = {
  tabIds: string[]
  active: string
}

export const [getTabContext, setTabContext] = createContext<TabContainer>();