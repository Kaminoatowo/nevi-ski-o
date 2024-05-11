<script lang="ts">
    import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronRightOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
	import { getSnowDepthChartConfig } from './chartConfig';
    import type { ApexOptions } from 'apexcharts';

    export let forecast;

	const snowDepth: any[] = [];
	
	for(let i in forecast){
		snowDepth.push(forecast[i].snowDepth);
	}

	const options: ApexOptions = getSnowDepthChartConfig(snowDepth);
</script>

<Card class="!bg-surface-900">
	<div class="flex justify-between">

		<div>
			<h5 class="leading-none text-3xl font-bold text-primary-200 pb-2">
				Profondità neve
			</h5>
			<p class="text-base font-normal text-secondary-500">
				Oggi
			</p>
		</div>
		
	</div>
	<Chart {options} />
</Card>

