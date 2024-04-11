<script lang="ts">
	export let data;
</script>

<h1>{data.title}</h1>
<div>
	<p>T min = {data.tmin} °C</p>
	<p>T max = {data.tmax} °C</p>
	<p>Rain = {data.rain} %</p>
</div>