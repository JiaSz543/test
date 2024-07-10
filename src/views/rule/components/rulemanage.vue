<template>
  <a-layout class="layout">
    <a-layout-header class="layout-navbar">
      <NavBar />
    </a-layout-header>
    <a-layout>
      <a-layout-sider style="width: 64px">
        <a-layout-sider class="layout-sider" breakpoint="xl" :collapsible="true"
          :style="{ width: '130px', paddingTop: '60px' }" :hide-trigger="true">
          <SidebarLeft :style="{ width: '100%' }" />
        </a-layout-sider>
        <a-drawer :visible="drawerVisible" placement="left" :footer="false" mask-closable :closable="false"
          @cancel="drawerCancel"></a-drawer>
      </a-layout-sider>
      <a-layout>
        <a-layout-sider class="layout-sider2">
          <div class="scrollable-content">
            <RuleMenu />
            <Components />
          </div>
        </a-layout-sider>
        <a-layout-content>
          <Operation style="margin-top: 60px" />
          <div id="vue_flow" class="border" oncontextmenu="return false;"
            style="position: relative; width: 100%; height: 100%">
            <VueFlow v-model="elements" class="customnodeflow" :snap-to-grid="true" :select-nodes-on-drag="true"
              :only-render-visible-elements="true" :max-zoom="50" :min-zoom="0.05" @dragover="onDragOver" @drop="onDrop"
              @node-double-click="onClick">
              <Background pattern-color="grey" gap="16" size="1.2" />

              <!-- Custom Connection from example -->
              <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
                <CustomConnectionLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
              </template>
              <!-- Custom Connection from example -->

              <!-- Custom Edge from example -->
              <template #edge-custom="props">
                <customEdgeVue v-bind="props" />
              </template>
              <!-- Custom Edge from example -->

              <template #node-nodeA="props">
                <simpleTextVue :id="props.id" :selected="props.selected" />
              </template>

              <!-- End of importing custom templates -->

              <Controls />
              <MiniMap />
            </VueFlow>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import NavBar from '@/components/navbar/index.vue';

import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import Components from '@/components/RuleManage/Components.vue';
import Operation from '@/components/RuleManage/Operation.vue';
import RuleMenu from '@/components/RuleManage/RuleMenu.vue';
import SidebarLeft from '@/components/menu/SidebarLeft.vue';

const isInit = ref(false);
const router = useRouter();
const route = useRoute();

const navbarHeight = `60px`;

const drawerVisible = ref(false);
const drawerCancel = () => {
  drawerVisible.value = false;
};
provide('toggleDrawerMenu', () => {
  drawerVisible.value = !drawerVisible.value;
});
onMounted(() => {
  isInit.value = true;
});

// vueflow Logic
// Importing vueflow specific stylesheet
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

// import default control and minimap styles
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';
/// /////////////////////////////////////////.

// Initials Elements
import { initialElements } from '@/assets/initial-elements';

// Externalise node creation process on Drop here
import { createVueNode } from '@/utils/createVueNode';
/// /////////////////////////////////////////.

// import simpleTextVue from '../RuleArrangement/simpleText.vue'

// Usage of Store Pinia
import { useStore } from '@/store/main';

const store = useStore();

const { addEdges, addNodes, onConnect, onPaneReady, project } = useVueFlow();

// Methods that helps, centering the vue.
onPaneReady(({ fitView }) => {
  fitView();
});

const onDragOver = (event) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
};


// The onDrop event handler that is responsible for the creation
const onDrop = (event) => {
  createVueNode(event, addNodes, project, store);
};
/// /////////////////////////////////////////.

// OnConnect node event, there is more work to do here.
onConnect((params) => {
  (params.type = 'custom'), (params.animated = false);
  addEdges([params]);
});
/// /////////////////////////////////////////.
const messageToEdit = ref('');
const elements = ref(initialElements);
/// /////////////////////////////////////////.

// Handling Clicked message to the message editor
// OnClick : connect message clicked to the message editor.
const onClick = (event) => {
  if (event.node.type === 'nodeA') {
    console.log(event.node.id);
    if (messageToEdit.value === event.node.id) {
      messageToEdit.value = '';
    } else {
      messageToEdit.value = event.node.id;
    }
  }
  store.messageToEdit = messageToEdit.value;
};
/// /////////////////////////////////////////.
const onKeyUp = (event) => {
  switch (event.key) {
    // Close the editor if Escape key is pressed
    case 'Escape':
      messageToEdit.value = '';
      break;

    default:
      break;
  }
};

onMounted(() => {
  window.addEventListener('keyup', onKeyUp);
});
/// /////////////////////////////////////////.


</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;

  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}

.scrollable-content {
  height: 100%;
  overflow-y: auto;
}

.layout-sider2 {
  width: 170px;
  margin-left: 64px;
  margin-top: 60px;

  overflow: hidden;
}
</style>
