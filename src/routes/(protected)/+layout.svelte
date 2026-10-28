<script lang="ts">
	import { adminStore } from "#lib/stores/session.ts";
	import { goto, refreshAll } from "$app/navigation";
	import { untrack } from "svelte";

  async function verifyPassword(password: string) {
    const verifyRes = await fetch('/api/admin/verify-password', {
      method: 'POST',
      headers: { 'Authorization': password }
    })

    return verifyRes.ok
  }

  async function askPassword() {
    // case 1: has password alr
    if (adminStore.current.password) {
      if (await verifyPassword(adminStore.current.password)) return true;

      adminStore.current.password = undefined;
      await refreshAll();
      return false;
    }

    // case 2: no password
    const inputPassword = prompt("Password:")

    if (inputPassword == null) { 
      await goto('/', { refreshAll: true }); 
      return false; 
    }

    if (await verifyPassword(inputPassword)) {
      adminStore.current.password = inputPassword;
      return true;
    };

    adminStore.current.password = undefined;
    await goto('/', { refreshAll: true });
    alert('Wrong password')
    return false;
  }

  let unlocked = $state(false);

  $effect.pre(() => {
    untrack(() => {
      askPassword().then(v => { unlocked = v; })
    })
  })

  let { children } = $props();
</script>

{#if unlocked}
  {@render children()}
{/if}