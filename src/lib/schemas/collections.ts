import type { Votes } from "./voting"

export type NominationsDocument = Votes & {
  hashed_ip: string,
  submitted_at: Date
}

export type SerializedNominationsDocument = Votes & {
  _id: string,
  hashed_ip: string,
  submitted_at: string
}