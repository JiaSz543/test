<script setup>
const treeData = [
  {
    title: 'Type 1',
    key: '0-0',
    children: [
      {
        title: '1-1',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Type 2',
    key: '0-1',
    children: [
      {
        title: '2-1',
        key: '0-1-0',
      },
    ],
  },
];
</script>
<template>
  <div class="flex-col group_6">
    <div class="flex-row items-center group_7">
      <span class="font_4 text_7">Rules</span>
      <button class="font_2 ml-44 btn">+ Add New</button>
    </div>
    <a-tree block-node :data="treeData" :virtualListProps="{
      height: 300,
    }" />
  </div>
</template>

<style scoped lang="less">
.font_2 {
  font-size: 0.88rem;
  font-family: Roboto;
  line-height: 0.63rem;
  color: #0193a8;
}

.group_6 {
  display: flex;
  flex-direction: column;
  padding: 1rem 0.13rem 1rem;
  border: 1px solid var(--color-border);
  overflow-y: auto;
}

.group_7 {
  padding-left: 0.5rem;
  padding-right: 0.31rem;
}

.font_4 {
  font-size: 1rem;
  font-family: Lexend;
  line-height: 0.93rem;
  color: #909399;
  padding-right: 34px;
}

.text_7 {
  margin-left: 0.88rem;
  line-height: 0.93rem;
}

.btn {
  padding: 0.63rem 0;
  border-radius: 1.25rem;
  box-shadow: 0rem 0.13rem 0rem #0000000a;
  overflow: hidden;
  width: 5.69rem;
  height: 2rem;
  border-left: solid 0.063rem #0193a8;
  border-right: solid 0.063rem #0193a8;
  border-top: solid 0.063rem #0193a8;
  border-bottom: solid 0.063rem #0193a8;
  background-color: rgba(255, 255, 255, 0);
}

.btn:hover {
  background-color: #eee;
}

.SiderbarLeft2 {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}
</style>
