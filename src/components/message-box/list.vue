<template>
  <a-list :bordered="false">
    <a-list-item action-layout="vertical">
      <template #extra></template>
      <div class="item-wrap">
        <a-list-item-meta>
          <template>
            <a-avatar shape="circle">
              <icon-desktop />
            </a-avatar>
          </template>
          <template #title>
            <a-space :size="4">
              <span></span>
              <a-typography-text type="secondary"></a-typography-text>
            </a-space>
          </template>
          <template #description>
            <div>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 1,
                }"
              ></a-typography-paragraph>
              <a-typography-text class="time-text"></a-typography-text>
            </div>
          </template>
        </a-list-item-meta>
      </div>
    </a-list-item>
    <template #footer>
      <a-space
        fill
        :size="0">
        <!--:class="{ 'add-border-top': renderList.length < showMax }"-->
        <div class="footer-wrap">
          <a-link>{{ $t('messageBox.allRead') }}</a-link>
        </div>
        <div class="footer-wrap">
          <a-link>{{ $t('messageBox.viewMore') }}</a-link>
        </div>
      </a-space>
    </template>
    <div></div>
  </a-list>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  const props = defineProps({
    renderList: {
      required: true,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
  });
  const emit = defineEmits(['itemClick']);

  const showMax = 3;
</script>

<style scoped lang="less">
  :deep(.arco-list) {
    .arco-list-item {
      min-height: 86px;
      border-bottom: 1px solid rgb(var(--gray-3));
    }
    .arco-list-item-extra {
      position: absolute;
      right: 20px;
    }
    .arco-list-item-meta-content {
      flex: 1;
    }
    .item-wrap {
      cursor: pointer;
    }
    .time-text {
      font-size: 12px;
      color: rgb(var(--gray-6));
    }
    .arco-empty {
      display: none;
    }
    .arco-list-footer {
      padding: 0;
      height: 50px;
      line-height: 50px;
      border-top: none;
      .arco-space-item {
        width: 100%;
        border-right: 1px solid rgb(var(--gray-3));
        &:last-child {
          border-right: none;
        }
      }
      .add-border-top {
        border-top: 1px solid rgb(var(--gray-3));
      }
    }
    .footer-wrap {
      text-align: center;
    }
    .arco-typography {
      margin-bottom: 0;
    }
    .add-border {
      border-top: 1px solid rgb(var(--gray-3));
    }
  }
</style>
