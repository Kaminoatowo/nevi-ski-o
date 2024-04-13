<script lang="ts">
	import { DayCloudy, DayRain, DaySunny, DayHail, DaySnow, DayWindy } from 'svelte-weather';
	export let data;
	const rain = data.rain;
</script>

<div class="w-2/3 mx-auto bg-surface-500 rounded-lg mt-5">
	<h1 class="text-center h-20 p-5 text-2xl">
		{data.title}
	</h1>
	<div class="border rounded text-center m-2 bg-secondary-500">
		<p>T min = {data.tmin} °C</p>
		<p>T max = {data.tmax} °C</p>
		<p>Rain = {data.rain} % 
			{#if Number(data.rain) > 50}
				<DayRain class="inline" />
			{:else}
				<DaySunny class="inline" />
			{/if}
		</p>
	</div>
</div>