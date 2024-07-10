<template>
  <div class="banner">
    <div class="banner-inner"></div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const carouselItem = computed(() => [
    {
      slogan: t('login.banner.slogan1'),
      subSlogan: t('login.banner.subSlogan1'),
    },
    {
      slogan: t('login.banner.slogan2'),
      subSlogan: t('login.banner.subSlogan2'),
    },
    {
      slogan: t('login.banner.slogan3'),
      subSlogan: t('login.banner.subSlogan3'),
    },
  ]);
</script>

<style lang="less" scoped>
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;

    &-inner {
      flex: 1;
      height: 100%;
    }
  }

  .carousel {
    height: 100%;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &-title {
      color: var(--color-fill-1);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }

    &-sub-title {
      margin-top: 8px;
      color: var(--color-text-3);
      font-size: 14px;
      line-height: 22px;
    }

    &-image {
      width: 320px;
      margin-top: 30px;
    }
  }
</style>
