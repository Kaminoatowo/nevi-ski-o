<script lang="ts">
    import { getRilievi, rilieviStore } from '../../store/storeRilievi';
    import { onMount } from 'svelte';

    let rilievi = rilieviStore;

    onMount(() => {
        getRilievi();
    });
</script>

