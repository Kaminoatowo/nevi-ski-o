import type { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';

export function getAccumulationChartConfig(
	hourlyAccumulation: any[],
	yDomain: number
): ApexOptions {
	return {
		chart: {
			height: 300,
			width: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false
			},
			zoom: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				formatter: (d: number) => dayjs(d).format('ddd DD ha')
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#1C64F2',
				gradientToColors: ['#1C64F2']
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 6
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 0,
				right: 2
			}
		},
		series: [
			{
				name: 'Accumulated snowfall',
				data: hourlyAccumulation.map((v) => v.accumulated_snowfall),
				color: '#1A56DB'
			}
		],
		xaxis: {
			type: 'datetime',
			categories: hourlyAccumulation.map((v) => v.datetime),
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				},
				formatter: (d: string) => dayjs(d).format('ha').slice(0, -1)
			},
			axisBorder: {
				show: false
			},
			tooltip: { enabled: false },
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			min: 0,
			tickAmount: 3,
			forceNiceScale: true,
			max: yDomain,
			labels: {
				show: true,
				offsetX: -10,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				},
				formatter: (value: number) => {
					return `${value.toFixed(1)}"`;
				}
			}
		}
	};
}