<template>
  <el-row class="home">
    <FilterButton></FilterButton>
    <TableBody></TableBody>
  </el-row>
</template>

<script>

  import FilterButton from '../components/FilterButton'
  import TableBody from '../components/TableBody'

  export default {
    components: {
      FilterButton,TableBody
    }
  }
</script>
