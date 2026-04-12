<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  data: { type: Array, required: true },
})

const chartData = computed(() => ({
  labels: props.data.map((item) => item.month),
  datasets: [
    {
      label: '수입',
      data: props.data.map((item) => item.income),
      backgroundColor: '#60a5fa',
      borderRadius: 8,
    },
    {
      label: '지출',
      data: props.data.map((item) => item.expense),
      backgroundColor: '#fb923c',
      borderRadius: 8,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label(context) {
          return `${context.dataset.label}: ${Number(context.raw).toLocaleString()}원`
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback(value) {
          return `${Math.round(value / 10000)}만`
        },
      },
    },
  },
}
</script>

<template>
  <div style="height: 320px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
