<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.role']" />
    <a-card class="general-card" :title="$t('menu.system.roles')">
      <a-row>
        <a-col :flex="1">
          <a-form
              :model="formModel"
              :label-col-props="{ span: 6 }"
              :wrapper-col-props="{ span: 18 }"
              label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                    field="name"
                    :label="$t('searchTable.form.name')"
                >
                  <a-input
                      v-model="formModel.name"
                      :placeholder="$t('searchTable.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    field="description"
                    :label="$t('searchTable.form.description')"
                >
                  <a-input
                      v-model="formModel.description"
                      :placeholder="$t('searchTable.form.description.placeholder')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="addClick">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table
          row-key="id"
          :loading="loading"
          :pagination="pagination"
          :data="renderData"
          :bordered="false"
          @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
              :title="$t('searchTable.columns.name')"
              data-index="name"
          />
          <a-table-column
              :title="$t('searchTable.columns.description')"
              data-index="description"
          />
          <a-table-column
              :title="$t('searchTable.columns.createTime')"
              data-index="createTime"
          />
          <a-table-column
              :title="$t('searchTable.columns.updateTime')"
              data-index="updateTime"
          />
          <a-table-column
              :title="$t('searchTable.columns.operations')"
              data-index="operations"
          >
            <template #cell="{ record }">
              <a-button type="text" size="small" @click="editClick(record)">
                {{ $t('searchTable.columns.operations.update') }}
              </a-button>
              <a-popconfirm
                  position="lt"
                  :content="
                  $t('searchTable.columns.operations.confirm.delete') +
                  record.name
                "
                  @cancel="onCancel()"
                  @ok="deleteRole({ id: record.id })"
              >
                <a-button type="text" size="small">
                  {{ $t('searchTable.columns.operations.delete') }}
                </a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <!-- new pop-up window -->
    <a-modal
        v-model:visible="modalVisible"
        width="auto"
        :mask-closable="false"
        @before-ok="modalOk"
        @cancel="modalCancel"
    >
      <template #title>
        {{ modalTitle }}
        <a-progress
            v-if="percent !== 0.0"
            type="circle"
            size="mini"
            :percent="percent"
        />
      </template>
      <div>
        <a-form :ref="formRef" :model="form" :style="{ width: '600px' }">
          <a-form-item field="name" label="角色名称" validate-trigger="input">
            <a-input v-model="form.name" placeholder="请输入角色名称..." />
          </a-form-item>
          <a-form-item
              field="description"
              label="角色描述"
              validate-trigger="input"
          >
            <a-input v-model="form.description" placeholder="请输入角色描述..." />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formModel: {
        name: '',
        description: ''
      },
      renderData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      modalVisible: false,
      modalTitle: '',
      form: {
        name: '',
        description: ''
      },
      percent: 0.0,
      formRef: 'formRef'
    };
  },
  methods: {
    search() {
      this.loading = true;
      // 模拟接口调用
      setTimeout(() => {
        this.renderData = [
          { id: 1, name: '管理员', description: '管理系统的所有权限', createTime: '2024-05-01', updateTime: '2024-06-28' },
          { id: 2, name: '用户', description: '普通用户，权限受限', createTime: '2024-06-01', updateTime: '2023-06-28' }
        ];
        this.loading = false;
        this.pagination.total = 2;
      }, 1000);
    },
    reset() {
      this.formModel = {
        name: '',
        description: ''
      };
      this.search();
    },
    addClick() {
      this.modalVisible = true;
      this.modalTitle = this.$t('searchTable.columns.modal.add.title');
      this.form = {
        name: '',
        description: ''
      };
    },
    editClick(record) {
      this.modalVisible = true;
      this.modalTitle = this.$t('searchTable.columns.modal.edit.title');
      this.form = { ...record };
    },
    modalOk() {
      // simulate save data
      console.log('保存数据', this.form);
      this.modalVisible = false;
      this.search();
    },
    modalCancel() {
      this.modalVisible = false;
    },
    deleteRole({ id }) {
      // simulate delete data
      console.log('删除数据', id);
      this.search();
    },
    onPageChange(page) {
      this.pagination.current = page;
      this.search();
    },
    onCancel() {
      // cancel
    }
  },
  created() {
    this.search();
  }
};
</script>

<style scoped lang="less">
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>