<script lang="ts">
	import { windir } from '$env/static/private';
import { DayCloudy, DayRain, DaySunny, DayHail, DaySnow, DayWindy, Windy } from 'svelte-weather';
	import { Thermometer } from 'svelte-weather';
	export let data;
	const current = data.current;
</script>

<div class="w-2/3 mx-auto bg-surface-500 rounded-lg mt-5">
	<h1 class="text-center p-5 text-2xl">
		{data.title}
	</h1>
	<div class="w-1/2 mx-auto border rounded text-center m-2 bg-secondary-500">
		<p>
			{#if Number(current.precipitationProb) > 20}
			<DayRain class="inline" color="gray"/>
			{:else}
			<DaySunny class="inline" color="orange"/>
			{/if}
			{current.conditions}
			
			{#if Number(current.temp) > 20}
			<Thermometer class="inline"	color="red"/>
			{:else if Number(current.temp) < 10}
			<Thermometer class="inline"	color="blue"/>
			{:else}
			<Thermometer class="inline"	color="gray"/>
			{/if}
			{current.temp}°C
		</p>
	</div>
	
	<br>
</div>