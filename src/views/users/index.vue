<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.user']" />
    <a-card class="general-card" :title="$t('menu.system.user')">
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
                    field="number"
                    :label="$t('searchTable.form.number')"
                >
                  <a-input
                      v-model="formModel.id"
                      :placeholder="$t('searchTable.form.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    field="username"
                    :label="$t('searchTable.form.username')"
                >
                  <a-input
                      v-model="formModel.username"
                      :placeholder="$t('searchTable.form.username.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    field="nickname"
                    :label="$t('searchTable.form.nickname')"
                >
                  <a-input
                      v-model="formModel.nickname"
                      :placeholder="$t('searchTable.form.nickname.placeholder')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" >
              <!--@click="search"-->
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button >
              <!--@click="reset"-->
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
            <a-button type="primary">
              <!--@click="addClick"-->
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
      >
        <template #columns>
          <a-table-column
              :title="$t('searchTable.columns.number')"
              data-index="id"
          />
          <a-table-column
              :title="$t('searchTable.columns.username')"
              data-index="username"
          />
          <a-table-column
              :title="$t('searchTable.columns.nickname')"
              data-index="nickname"
          />
          <a-table-column
              :title="$t('searchTable.columns.avatar')"
              data-index="avatar"
          >
            <template #cell="{ record }">
              <a-space>
                <a-avatar>
                  <img :src="record.avatar" alt="" />
                </a-avatar>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column
              :title="$t('searchTable.columns.age')"
              data-index="age"
          />
          <a-table-column
              :title="$t('searchTable.columns.sex')"
              data-index="sex"
          >
            <template #cell="{ record }">
              {{ $t(`searchTable.form.sex.${record.sex}`) }}
            </template>
          </a-table-column>
          <a-table-column
              :title="$t('searchTable.columns.email')"
              data-index="email"
          />
          <a-table-column
              :title="$t('searchTable.columns.phone')"
              data-index="phone"
          />
          <a-table-column
              :title="$t('searchTable.columns.role')"
              data-index="role"
          >
            <template #cell="{ record }">
              <span v-if="record.role === 'admin'">管理员</span>
              <span v-if="record.role === 'user'">用户</span>
            </template>
          </a-table-column>
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
              <!-- <a-button type="text" size="small" @click="showData(record)">
                {{ $t('searchTable.columns.operations.view') }}
              </a-button> -->
              <a-button type="text" size="small" @click="addClick(record)">
                {{ $t('searchTable.columns.operations.update') }}
              </a-button>
              <a-popconfirm
                  position="lt"
                  :content="
                  $t('searchTable.columns.operations.confirm.delete') +
                  record.username
                "
                  @cancel="onCancel()"
                  @ok="deleteUser({ id: record.id })"
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

    <!-- New pop-up window -->
    <a-modal
        v-model:visible="addVisible"
        width="auto"
        :mask-closable="false"
        @cancel="addCancel"
    >
      <!-- @before-ok="addOk"-->
      <template #title>
        {{ $t('searchTable.columns.modal.add.title') }}
        <a-progress
            v-if="percent != 0.0"
            type="circle"
            size="mini"
            :percent="percent"
        />
      </template>
      <div>
        <a-form :ref="formRef?.valueOf()" :model="form" :style="{ width: '600px' }">
          <a-form-item field="username" label="账号" validate-trigger="input">
            <a-input v-model="form.username" placeholder="请输入用户名称..." />
          </a-form-item>
          <a-form-item
              v-if="isShow"
              field="password"
              label="密码"
              validate-trigger="input"
          >
            <a-input-password
                v-model="form.password"
                placeholder="请输入用户密码..."
            />
          </a-form-item>
          <a-form-item field="nickname" label="昵称" validate-trigger="input">
            <a-input v-model="form.nickname" placeholder="请输入昵称..." />
          </a-form-item>

          <!-- avatar -->
          <a-form-item field="avatar" label="头像" validate-trigger="input">
            <a-upload
                list-type="picture"
                action="/api/file/upload"
                :limit="1"
                @success="onSuccess"
            />
            <!--:file-list="file ? [file] : []"-->
          </a-form-item>

          <a-form-item field="age" label="年龄" validate-trigger="input">
            <a-input-number v-model="form.age" placeholder="请输入年龄..." />
          </a-form-item>
          <a-form-item field="sex" label="性别" validate-trigger="input">
            <a-select v-model="form.sex" placeholder="请选择性别 ...">
              <a-option value="0">女</a-option>
              <a-option value="1">男</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="email" label="邮箱" validate-trigger="input">
            <a-input v-model="form.email" placeholder="请输入邮箱..." />
          </a-form-item>
          <a-form-item field="phone" label="联系方式" validate-trigger="input">
            <a-input v-model="form.phone" placeholder="请输入联系方式..." />
          </a-form-item>
          <a-form-item field="role" label="角色" validate-trigger="input">
            <a-select v-model="form.role" placeholder="请选择角色 ...">
              <a-option value="admin">管理员</a-option>
              <a-option value="user">用户</a-option>
            </a-select>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { FormInstance } from '@arco-design/web-vue/es/form';
import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import { UserState } from '@/store/modules/user/types';
import { Pagination } from '@/types/global';
import IconPlus from '@arco-design/web-vue/es/icon/icon-plus';

const generateFormModel = () => {
  return {
    id: '',
    username: '',
    password: '',
    nickname: '',
    avatar: '',
    age: 0,
    sex: '',
    email: '',
    phone: '',
    role: '',
    createTime: '',
    updateTime: '',
  };
};

const serarchModel = () => {
  return {
    id: '',
    username: '',
    nickname: '',
    sex: '',
    email: '',
    phone: '',
    role: '',
    createTime: '',
    updateTime: '',
  };
};

export default defineComponent({
  components: { IconPlus },
  setup() {
    const { loading, setLoading } = useLoading(true);
    const { t } = useI18n();
    const renderData = ref<UserState[]>([]);
    const formModel = ref(serarchModel());
    const form = ref(generateFormModel());
    const addVisible = ref(false);
    const percent = ref(0.0);
    const formRef = ref<FormInstance>();
    const isShow = ref(true);
    const file = ref('');

    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };

    const pagination = reactive({
      ...basePagination,
    });

    const onSuccess = (currentFile: any) => {
      form.value.avatar = currentFile.response.data.fileName;
      Message.success(currentFile.response.msg);
    };

    const onCancel = () => {
      Message.success(t('searchTable.columns.operations.confirm.cancel'));
    };

    // fetch data

    // delete user
    const deleteUser = async (params: { id: string }) => {
      setLoading(true);
    };


    // Add pop-up window
    const addClick = (params: {
      id: string;
      username: string;
      password: string;
      nickname: string;
      avatar: string;
      age: number;
      sex: string;
      email: string;
      phone: string;
      role: string;
      createTime: string;
      updateTime: string;
    }) => {
      form.value = params;
      if (form.value.id !== undefined) {
        isShow.value = false;
        addVisible.value = true;
      } else {
        isShow.value = true;
        addVisible.value = true;
      }
    };

    // confirm add and modify
    const addOk = async (done: () => void) => {
      done();
    };

    // confirm cancel
    const addCancel = () => {
      Message.info(t('searchTable.columns.modal.add.confirm.cancel'));
    };

    // reset

    return {
      loading,

      renderData,
      pagination,
      formModel,
      deleteUser,
      addVisible,
      addClick,
      addOk,
      addCancel,
      onCancel,
      percent,
      form,
      formRef,
      isShow,
      file,
      onSuccess,
    };
  },
});
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
