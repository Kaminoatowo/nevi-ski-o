<script lang="ts">
    import { DayCloudy, DayRain, DaySunny, DayHail, DaySnow, DayWindy, Windy } from 'svelte-weather';

    export let forecast;
</script>

{#if forecast.conditions.toLowerCase().includes("rain")}
<DayRain class="w-8 h-8 inline" />
{:else if forecast.conditions.toLowerCase().includes("sunny") || forecast.conditions.toLowerCase().includes("clear")}
<DaySunny class="w-8 h-8 inline" />
{:else if forecast.conditions.toLowerCase().includes("cloud")}
<DayCloudy class="w-8 h-8 inline" />
{:else if forecast.conditions.toLowerCase().includes("hail")}
<DayHail class="w-8 h-8 inline" />
{:else if forecast.conditions.toLowerCase().includes("snow")}
<DaySnow class="w-8 h-8 inline" />
{:else if forecast.conditions.toLowerCase().includes("windy")}
<DayWindy class="w-8 h-8 inline" />
{:else}
<DaySunny class="w-8 h-8 inline" />
{/if}