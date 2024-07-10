<template>
  <div class="fixed-settings">
    <a-button type="primary">
      <template #icon>
        <icon-settings />
      </template>
    </a-button>
  </div>
  <a-drawer
    :width="300"
    unmount-on-close
    :cancel-text="$t('settings.close')"
    :ok-text="$t('settings.copySettings')"
  >
    <template #title>{{ $t('settings.title') }}</template>
    <Block :title="$t('settings.content')" />
    <Block :title="$t('settings.otherSettings')" />
    <a-alert>{{ $t('settings.alertContent') }}</a-alert>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useClipboard } from '@vueuse/core';

  const emit = defineEmits(['cancel']);

  const { t } = useI18n();
  const { copy } = useClipboard();
</script>

<style scoped lang="less">
  .fixed-settings {
    position: fixed;
    top: 280px;
    right: 0;

    svg {
      font-size: 18px;
      vertical-align: -4px;
    }
  }
</style>
