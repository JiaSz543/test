<script setup>
import { ref } from 'vue';

const treeData = ref([
  {
    title: 'Logic',
    key: '0-0',
    children: [
      {
        title: 'AND',
        key: '0-0-0',
      },
      {
        title: 'OR',
        key: '0-0-1',
      },
      {
        title: 'XOR',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Rules',
    key: '0-1',
    children: [
      {
        title: '1-1',
        key: '0-1-0',
      },
      {
        title: '1-2',
        key: '0-1-1',
      },
      {
        title: '2-1',
        key: '0-1-2',
      },
    ],
  },
  {
    title: 'Events',
    key: '0-2',
    children: [
      {
        title: '1-1-1',
        key: '0-2-0',
      },
      {
        title: '1-2-1',
        key: '0-2-1',
      },
      {
        title: '1-2-2',
        key: '0-2-2',
      },
    ],
  },
]);

const props = defineProps({
  title: String,
  key: String,
});

const isMainNode = (key) => {
  const regex = /^\d-\d$/;
  return regex.test(key);
};

const onDragStart = ($event, node) => {

  if ($event.dataTransfer) {
    $event.dataTransfer.setData(
      'application/vueflow',
      JSON.stringify({
        title: node.title,
        key: node.key,
      })
    );
    $event.dataTransfer.effectAllowed = 'move';
  };
}
</script>
<template>
  <div class="flex-col group_9">
    <span class="self-start font_3 text_20">Components</span>
    <a-tree block-node :data="treeData" :virtualListProps="{
      height: 420,
    }" :hoverable="true" :draggable="true" @drag-start="onDragStart" />
  </div>
</template>

<style scoped>
.group_9 {
  padding: 1rem 0.13rem 1rem;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.font_3 {
  font-size: 1rem;
  font-family: Lexend;
  line-height: 0.93rem;
  color: #909399;
}

.text_20 {
  margin-left: 0.88rem;
  line-height: 0.93rem;
}
</style>
