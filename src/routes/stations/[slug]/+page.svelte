<script lang="ts">
	import { DayCloudy } from 'svelte-weather';
	export let data;
</script>

<div class="w-2/3 mx-auto bg-surface-500 rounded-lg mt-5">
	<h1 class="text-center h-20 p-5 text-2xl">
		{data.title}
	</h1>
	<div class="border rounded text-center m-2 bg-secondary-500">
		<p>T min = {data.tmin} °C</p>
		<p>T max = {data.tmax} °C</p>
		<p>Rain = {data.rain} % <DayCloudy class="inline" /></p>
	</div>
</div>