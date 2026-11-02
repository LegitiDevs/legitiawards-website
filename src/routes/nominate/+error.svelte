<script>
  import LegitiAwardsButton from '#lib/components/LegitiAwardsButton.svelte';
  import { page } from '$app/state';
</script>

<LegitiAwardsButton />
<div class="main-section">
  {#if [403, 409].includes(page.status)}
    <h1>{page.status == 403 ? "Nominations are closed" : "Thank you for nominating!"}</h1>
    <h3>Stay tuned to get the latest updates about the ceremony.</h3>
  {:else}
    <h1>Something went wrong!</h1>
    <h3>Please screenshot this page and contact an admin about this error.</h3>
  {/if}
  <p class="error-code-container">({page.status}) {page.error?.message}</p>
</div>

<style>
  .main-section {
    min-height: 100vh;
    background-image: url('/assets/img/cyan_background.png');
    background-position: center;
    background-size: 100%;
    background-repeat: repeat-y;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: white;
    font-family: 'Poppins', 'Helvetica';
    text-align: center;
  }

  h1 {
    font-family: 'MinecraftTen', 'Poppins', 'Helvetica';
    font-size: 4rem;
    font-weight: normal;
  }

  p.error-code-container {
    font-size: 0.8rem;
    opacity: 0.2;
    margin-block: 1rem;
  }
</style>