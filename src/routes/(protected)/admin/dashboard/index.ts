import { LEGITIMOOSE_API, PLAYERDB_MC } from "#lib/constants.ts";
import type { Votes } from "#lib/schemas/voting.ts";
import { adminStore } from "#lib/stores/session.ts";

export async function fetchInitialData() {
  const nominationsRes = await fetch('/api/nominations', {
    headers: { 'Authorization': adminStore.current.password! }
  })

  const categoriesRes = await fetch('/api/categories')
  
  return [await nominationsRes.json(), await categoriesRes.json()]
}

export async function deleteNomination(nominationId: string) {
  const nominationsRes = await fetch(`/api/nominations/${nominationId}`, {
    headers: { 'Authorization': adminStore.current.password! },
    method: "DELETE"
  })

  if (!nominationsRes.ok) {
    return {
      status: nominationsRes.status,
      statusText: nominationsRes.statusText
    }
  }

  return null 
}

export type VoteCount = { id: string; votes: number };

export function countCategoryValues(
  items: Votes[],
  field: keyof Votes['categories']
): VoteCount[] {
  const counts = new Map<string, number>();

  for (const item of items) {
    const value = item.categories[field];
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([id, votes]) => ({ id, votes }))
    .sort((a, b) => b.votes - a.votes);
}

export type NomineeNames = { [k: VoteCount['id']]: string }

export async function getNomineeNames(nominees: VoteCount[]): Promise<NomineeNames> {
  const names: NomineeNames = {}
  
  for (let nominee of nominees) {
    const legitidevsRes = await fetch(`${LEGITIMOOSE_API}/v4/worlds/${nominee.id}?project=name`)
    if (legitidevsRes.ok) {
      names[nominee.id] = (await legitidevsRes.json()).name;
      continue;
    }

    const playerDbRes = await fetch(`${PLAYERDB_MC}/${nominee.id}`)
    if (playerDbRes.ok) {
      names[nominee.id] = (await playerDbRes.json()).data.player.username;
      continue;
    }

    names[nominee.id] = nominee.id
  }

  return names
}