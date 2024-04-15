<script lang="ts">
	import { DayCloudy, DayRain, DaySunny, DayHail, DaySnow, DayWindy } from 'svelte-weather';
	import { Thermometer } from 'svelte-weather';
	export let data;
	const rain = data.rain;
</script>

<div class="w-2/3 mx-auto bg-surface-500 rounded-lg mt-5">
	<h1 class="text-center p-5 text-2xl">
		{data.title}
	</h1>
	<div class="w-1/2 mx-auto border rounded text-center m-2 bg-secondary-500">
		<p>
			<!--Rain = {data.rain} % -->
			{#if Number(data.rain) > 50}
				<DayRain class="inline" color="gray"/>
			{:else}
				<DaySunny class="inline" color="orange"/>
			{/if}
			<Thermometer class="inline" color="blue"/> {data.tmin}°C 
			<Thermometer class="inline" color="red"/> {data.tmax} °C 
		</p>
	</div>
	<br>
</div>