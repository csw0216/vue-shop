<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{name1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{name2}}</el-breadcrumb-item>
  </el-breadcrumb>

</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
defineProps({
  name1: String,
  name2: String
})
</script>

