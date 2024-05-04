<script lang="ts">
	import { DayCloudy, DayRain, DaySunny, DayHail, DaySnow, DayWindy, Windy } from 'svelte-weather';
	import { Thermometer } from 'svelte-weather';
	import ForecastCard from '$lib/components/ForecastCard.svelte';

	export let data;
	const current = data.current;
	const forecast = data.forecast.slice(0, 5);
</script>

<div class="w-2/3 mx-auto bg-surface-500 rounded-lg mt-5">
	<p class="p-6">
		<a href="/" class="underline underline-offset-2">Home</a>>
		<a href="/stations" class="underline underline-offset-2">Stazioni</a>>
		{data.title}
	</p>

	<div class="flex flex-row justify-end">
		
		<h1 class="p-5 text-3xl inline-block">
			{data.title}
		</h1>
		<div class="w-1/2 mx-auto border rounded text-center m-5 inline-block bg-secondary-500">
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
		
	</div>

	<ForecastCard {forecast} />

	<ForecastCard {forecast}>
		<div class="rounded-t-lg border-b border-b-surface-500 bg-surface-800 p-5">
			<h2 class="text-2xl">
				Previsioni
			</h2>
		</div>
		<div class="max-h-[500px] overflow-auto px-4 py-6">
			<ul class="list">
				{#each forecast as day}
				<li class="!rounded-md">
					<div class="grid w-full grid-cols-6 items-center gap-3 py-2">
						<p class="text-xs text-surface-400 sm:text-sm">
							{day.date}
						</p>
					</div>
				</li>
				{/each}
			</ul>
		</div>
	</ForecastCard>

	<br>
</div>