<script lang="ts">
    import { Chart } from 'flowbite-svelte';
	import { getAccumulationChartConfig } from './chartConfig';
    
    export let forecast;
    let snowNext24H = 24;

    const hourlyAccumulation = forecast.map((hour: { datetime: any; }, i: number) => {
		return {
			datetime: hour.datetime,
			accumulated_snowfall: forecast
				.slice(0, i + 1)
				.reduce((acc: any, curr: { snowfall: any; }) => acc + curr.snowfall, 0)
		};
	});

    const next24hYDomain = snowNext24H > 6 ? snowNext24H : 6;

	const options = getAccumulationChartConfig(hourlyAccumulation, next24hYDomain);
   
</script>

<Chart {options} />