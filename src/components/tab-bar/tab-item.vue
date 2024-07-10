<template>
  <a-dropdown trigger="contextMenu" :popup-max-height="false">
    <span class="arco-tag arco-tag-size-medium arco-tag-checked">
      <span class="tag-link"></span>
      <span
        class="arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn"
      >
        <icon-close />
      </span>
    </span>
    <template #content>
      <a-doption :value="Eaction.reload">
        <icon-refresh />
        <span>重新加载</span>
      </a-doption>
      <a-doption
        class="sperate-line"
        :disabled="disabledCurrent"
        :value="Eaction.current"
      >
        <icon-close />
        <span>关闭当前标签页</span>
      </a-doption>
      <a-doption :disabled="disabledLeft" :value="Eaction.left">
        <icon-to-left />
        <span>关闭左侧标签页</span>
      </a-doption>
      <a-doption class="sperate-line" :value="Eaction.right">
        <icon-to-right />
        <span>关闭右侧标签页</span>
      </a-doption>
      <a-doption :value="Eaction.others">
        <icon-swap />
        <span>关闭其它标签页</span>
      </a-doption>
      <a-doption :value="Eaction.all">
        <icon-folder-delete />
        <span>关闭全部标签页</span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  // eslint-disable-next-line no-shadow
  enum Eaction {
    reload = 'reload',
    current = 'current',
    left = 'left',
    right = 'right',
    others = 'others',
    all = 'all',
  }

  const props = defineProps({
    itemData: {
      default() {
        return [];
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  });

  const router = useRouter();
  const route = useRoute();
  const disabledCurrent = computed(() => {
    return props.index === 0;
  });

  const disabledLeft = computed(() => {
    return [0, 1].includes(props.index);
  });
</script>

<style scoped lang="less">
  .tag-link {
    color: var(--color-text-2);
    text-decoration: none;
  }
  .link-activated {
    color: rgb(var(--link-6));
    .tag-link {
      color: rgb(var(--link-6));
    }
    & + .arco-tag-close-btn {
      color: rgb(var(--link-6));
    }
  }
  :deep(.arco-dropdown-option-content) {
    span {
      margin-left: 10px;
    }
  }
  .arco-dropdown-open {
    .tag-link {
      color: rgb(var(--danger-6));
    }
    .arco-tag-close-btn {
      color: rgb(var(--danger-6));
    }
  }
  .sperate-line {
    border-bottom: 1px solid var(--color-neutral-3);
  }
</style>
