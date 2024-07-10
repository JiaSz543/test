<template>
  <a-spin style="display: block">
    <a-tabs v-model:activeKey="messageType" type="rounded" destroy-on-hide>
      <a-tab-pane v-for="item in tabList" :key="item.key">
        <template #title>
          <span>{{ item.title }}</span>
        </template>
        <a-result>
          <template #subtitle>{{ $t('messageBox.noContent') }}</template>
        </a-result>
        <!--<List />-->
      </a-tab-pane>
      <template #extra>
        <a-button type="text">
          {{ $t('messageBox.tab.button') }}
        </a-button>
      </template>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import List from './list.vue';

  interface TabItem {
    key: string;
    title: string;
    avatar?: string;
  }
  const messageType = ref('message');
  const { t } = useI18n();

  const tabList: TabItem[] = [
    {
      key: 'message',
      title: t('messageBox.tab.title.message'),
    },
    {
      key: 'notice',
      title: t('messageBox.tab.title.notice'),
    },
    {
      key: 'todo',
      title: t('messageBox.tab.title.todo'),
    },
  ];
</script>

<style scoped lang="less">
  :deep(.arco-popover-popup-content) {
    padding: 0;
  }

  :deep(.arco-list-item-meta) {
    align-items: flex-start;
  }
  :deep(.arco-tabs-nav) {
    padding: 14px 0 12px 16px;
    border-bottom: 1px solid var(--color-neutral-3);
  }
  :deep(.arco-tabs-content) {
    padding-top: 0;
    .arco-result-subtitle {
      color: rgb(var(--gray-6));
    }
  }
</style>
