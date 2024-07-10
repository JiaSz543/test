<template>
  <a-layout class="layout">
    <a-layout-header class="layout-navbar">
      <NavBar />
    </a-layout-header>
    <a-layout>
      <a-layout>
        <a-layout-sider
            class="layout-sider"
            breakpoint="xl"
            :collapsible="true"
            :style="{ paddingTop: '60px' }"
            :hide-trigger="true"
        >
          <div class="menu-wrapper">
            <a-menu
                mode="vertical"
                :default-selected-keys="['1']"
                @menu-item-click="handleMenuClick" @sub-menu-click="handleMenuClick"
            >
              <a-menu-item key="1" class="mt-28 SiderbarLeft" router-link="/Log"><icon-apps /> Security Log Manage </a-menu-item>
              <a-sub-menu key="2" class="mt-28 SiderbarLeft">
                <template #title>
                  <icon-list /> Rule Manage
                </template>
                <a-menu-item key="2-1"><icon-menu /> Rule Set</a-menu-item>
                <a-menu-item key="2-2"><icon-mind-mapping /> Rule arrangement</a-menu-item>
              </a-sub-menu>
              <a-menu-item key="3" class="mt-28 SiderbarLeft"><icon-archive /> Event Manage</a-menu-item>
              <a-sub-menu key="4" class="mt-28 SiderbarLeft">
                <template #title>
                  <icon-user /> User System
                </template>
                <a-menu-item key="4-1"><icon-user /> User Manage</a-menu-item>
                <a-menu-item key="4-2"><icon-user-group /> Role Manage</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </div>
        </a-layout-sider>
        <a-drawer
            :visible="drawerVisible"
            placement="left"
            :footer="false"
            mask-closable
            :closable="false"
            @cancel="drawerCancel"
        >
          <a-menu
              mode="vertical"
              :default-selected-keys="['1']"
              @click="handleMenuClick"
          >
            <a-menu-item key="1" class="mt-28 SiderbarLeft"><icon-apps /> Security Log Manage </a-menu-item>
            <a-sub-menu key="2" class="mt-28 SiderbarLeft">
              <template #title>
                <icon-list /> Rule Manage
              </template>
              <a-menu-item key="2-1"><icon-menu /> Rule Set</a-menu-item>
              <a-menu-item key="2-2"><icon-mind-mapping /> Rule arrangement</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="3" class="mt-28 SiderbarLeft"><icon-archive /> Event Manage</a-menu-item>
            <a-sub-menu key="4" class="mt-28 SiderbarLeft">
              <template #title>
                <icon-user /> User System
              </template>
              <a-menu-item key="4-1"><icon-user /> User Manage</a-menu-item>
              <a-menu-item key="4-2"><icon-user-group /> Role Manage</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-drawer>
        <a-layout class="layout-content" style="padding-left: 228px; padding-top: 60px;">
          <a-layout-content>
            <div class="container">
              <div class="left-side"></div>
              <div class="right-side">
                <a-grid :cols="24" :row-gap="16"></a-grid>
              </div>
            </div>
          </a-layout-content>
          <Footer />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import NavBar from '@/components/navbar/index.vue';
import Footer from '@/components/footer/index.vue';

import { useVueFlow } from '@vue-flow/core';

const router = useRouter();
const handleMenuClick = (key) => {
  let path = '';
  switch (key) {
    case '1':
      path = '/Layout/Log';
      break;
    case '2-1':
      path = '/Layout/Rule/RuleSet';
      break;
    case '2-2':
      path = '/Layout/Rule/RuleManage';
      break;
    case '3':
      path = '/Layout/Event';
      break;
    case '4-1':
      path = '/Layout/system/users';
      break;
    case '4-2':
      path = '/Layout/system/roles';
      break;
    default:
      return;
  }
  router.push(path);
};

const isInit = ref(false);

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

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

// import default control and minimap styles
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';
/// /////////////////////////////////////////.

// Initials Elements
import { initialElements } from '../../assets/initial-elements';

// Externalise node creation process on Drop here
import { createVueNode } from '../../utils/createVueNode';

import { useStore } from '../../store/main';

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
/// /////////////////////////////////////////.

// The onDrop event handler that is responsible for the creation
const onDrop = (event) => {
  // console.log(event.target.parentNode);
  createVueNode(event, addNodes, project, store);
};
/// /////////////////////////////////////////.

// OnConnect node event, there is more work to do here.
// onConnect((params) => {
//   (params.type = 'custom'), (params.animated = false);
//   addEdges([params]);
// });
/// /////////////////////////////////////////.
const messageToEdit = ref('');
const elements = ref(initialElements);
/// /////////////////////////////////////////.

// Handling Clicked message to the message editor
// OnClick : connect message clicked to the message editor.
// const onClick = (event) => {
//   if (event.node.type === 'nodeA') {
//     console.log(event.node.id);
//     if (messageToEdit.value === event.node.id) {
//       messageToEdit.value = '';
//     } else {
//       messageToEdit.value = event.node.id;
//     }
//   }
//   store.messageToEdit = messageToEdit.value;
// };
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

.container {
  background-color: var(--color-fill-2);
  display: flex;
}

.left-side {
  flex: 1;
  overflow: auto;
}

.right-side {
  width: 280px;
  margin-left: 16px;
}

.layout {
  width: 100%;
  height: 100vh;
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
}

.layout-content {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
