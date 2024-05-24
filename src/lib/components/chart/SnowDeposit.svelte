<script lang="ts">
    import SnowDepthChart from './SnowDepthChart.svelte';
    export let forecast;
</script>

<div class="p-4 bg-surface-950 border-x border-b border-surface-700 rounded-b-lg  min-h-[350px]">
    <div class="w-full px-3">
        <div style="min-height: 315px;">
            <SnowDepthChart {forecast} />
        </div>
    </div>
</div>