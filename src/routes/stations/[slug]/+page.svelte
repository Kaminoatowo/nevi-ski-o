<script lang="ts">
	import { DayCloudy, DayRain, DaySunny, DayHail, DaySnow, DayWindy, Windy } from 'svelte-weather';
	import { Thermometer } from 'svelte-weather';
	import SnowDeposit from '$lib/components/SnowDeposit.svelte';
	import ForecastCard from '$lib/components/ForecastCard.svelte';
	import HourlyForecastCard from '$lib/components/HourlyForecastCard.svelte';
	import WeatherImage from '$lib/components/WeatherImage.svelte';

	export let data;
	const current = data.current;
	const forecast = data.forecast;
	const hourly = data.hourly;
</script>

<div class="sm:w-4/5 mx-auto bg-surface-500 sm:rounded-lg mt-5">
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
				<WeatherImage forecast={current} />
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

	<div class="mx-auto w-full max-w-screen-xl">

		<section>
			<SnowDeposit forecast={hourly} />

		</section>

		<section class="grid grid-cols-2 sm:gap-4">
			
			
				<ForecastCard {forecast} />
			
				<HourlyForecastCard forecast={hourly} />
			
		</section>
	</div>

	

	<br>
</div>