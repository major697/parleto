<template>
   <tr class="table-body">
      <td class="table-body__element">{{ worker.name }}</td>
      <td class="table-body__element">{{ worker.surname }}</td>
      <td class="table-body__element">{{ worker.section }}</td>
      <td class="table-body__element">{{ worker.pay }} {{ worker.currency }}</td>
   </tr>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/TableBody';
</style>

<script>
export default {
   name: 'ListWorkerComponent',
   props: {
      worker: {
         type: Object,
         required: true,
      },
   },
};
</script>
