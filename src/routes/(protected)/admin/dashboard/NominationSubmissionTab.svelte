<script lang="ts">
	import type { SerializedNominationsDocument } from "#lib/schemas/collections.ts";
	import { deleteNomination } from "./index.ts";
	import Tab from "./Tab.svelte";

  type Props = {
    nomination: SerializedNominationsDocument,
    ondelete?: (nominationId: string) => any
  }

  let { nomination, ondelete }: Props = $props();

  const UTCDateTimeFormatter = new Intl.DateTimeFormat("en-us", { dateStyle: "medium", timeStyle: "long", timeZone: "UTC" });
  const LocalDateTimeFormatter = new Intl.DateTimeFormat("en-us", { dateStyle: "medium", timeStyle: "long" })
</script>

<Tab id={nomination._id.toString()}>
  <p>Event: {nomination.event_id}</p>
  <p>Submitted at: {LocalDateTimeFormatter.format(new Date(nomination.submitted_at))} ({UTCDateTimeFormatter.format(new Date(nomination.submitted_at))})</p>
  <pre>{JSON.stringify(nomination, null, 2)}</pre>

  {let error = $state<Awaited<ReturnType<typeof deleteNomination>>>()}
  <button class="danger" onclick={async () => {error = await deleteNomination(nomination._id); ondelete?.(nomination._id)}}>Delete</button>
  {#if error != null}
    <p>({error.status}) Something went wrong :(</p>
    <p>{error.statusText}</p>
  {/if}
</Tab>