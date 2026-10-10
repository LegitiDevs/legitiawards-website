<script lang="ts">
    type Props = {
        value: string
    }
 
    let { value = $bindable() }: Props = $props();
</script>
 
<input bind:value placeholder="Search and pick..." />
 
<style>
    input {
        all: unset;
 
        background-color: #131314;
        box-shadow:
            0px -6px #0e0e0f,
            0px 0px 0px 3px #050506,
            0px -6px 0px 3px #050506;
 
        padding: 15px;
 
        font-family: 'MinecraftDefault', 'Cascadia Code';
        font-size: 2rem;
        line-height: 0;
        color: white;
 
        &::placeholder {
            font-style: italic;
            overflow: visible;
            translate: 2px;
        }
    }
</style>