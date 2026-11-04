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

type VoteCount = { id: string; votes: number };

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