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