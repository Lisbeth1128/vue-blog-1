<template>
  <div id="index">
    <section class="blog-posts">
      <router-link
        class="item"
        v-for="blog in blogs"
        :key="blog.id"
        :to="`/detail/${blog.id}`"
      >
        <router-link class="avatar" :to="`/user/${blog.user.id}`">
          <img :src="blog.user.avatar" :alt="blog.user.username" />
          <figcaption>{{ blog.user.username }}</figcaption>
        </router-link>
        <h3>
          {{ blog.title }} <span>{{ friendlyDate(blog.createdAt) }}</span>
        </h3>
        <p class="description">{{ blog.description }}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange"> </el-pagination>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<style scoped lang="less" src="./template.less"></style>
