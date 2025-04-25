<template>
  <div class="users">
    <Breadcrumb name1="用户管理" name2="用户列表" />
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加用户区域 -->
          <el-button type="primary" @click="addDialogVisible = true">用户添加</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userData.userList" stripe style="width: 100%" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"
              @change="userStatuChanged(scope.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"
              @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"
              @click="removeUserById(scope.row.id)"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRoles(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
        @size-change="handleSizeChange" :page-size="queryInfo.pagesize" :page-sizes="[5, 9, 13, 15]"
        layout="total, sizes, prev, pager, next, jumper" :total="userData.total">
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDislogClosed">
      <!-- 内容主题区域 -->
      <el-form label-width="70px" ref="addFormRef" :model="addForm" :rules="addFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息对话框 -->
    <el-dialog title="修改用户" @close="aditClosed" :visible.sync="editDialogVisble" width="50%">
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisble = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="setRolesDialogVisible" @close="setRolesDialogClosed" width="50%">
      <div>
        <p>当前的用户 : {{ userInfo.username }}</p>
        <p>当前的角色 : {{ userInfo.role_name }}</p>
        <p>
          分配新角色:
          <el-select v-model="selectRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRolesInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { userAddFormRulesMixin } from '@/common/mixin.js'
import Breadcrumb from '@/components/content/breadcrumb/Breadcrumb.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from "@/api/index.js"
import { onMounted } from "vue"

mixins= [userAddFormRulesMixin]

const router = useRouter()
  // 获取用户列表的参数对象
  const queryInfo = {
  // 搜索值
  query: '',
  // 当前的页数
  pagenum: 1,
  // 当前每次显示多少条数据
  pagesize: 5
}
// 存放用户的数据和数量
const userData = {
  userList: [],
  total: 0
}
// 控制用户对话框的显示和隐藏
const addDialogVisible = ref(false)
// 添加用户数据的对象
const addForm = reactive({
  username: '',
  password: '',
  email: '',
  mobile: ''
})
// 修改用户消息对话框显示和隐藏
const editDialogVisble = ref(false)
// 控制分配角色对话框的显示和隐藏
const setRolesDialogVisible = ref(false)
// 需要被分配角色的用户信息
userInfo = {}
// 分配角色列表
rolesList = []
// 保存已经选中的角色id值
selectRoleId = ''
// 查询用户的对象
editForm = {}


onMounted(() => {
  {
    getUserList()
  }
})

getUserList = async () => {
  const { data: res } = await api.get('users', {
    params: queryInfo
  })
  if (res.meta.status !== 200) {
    ElMessage.error('获取用户列表失败!')
  }
  ElMessage.success('获取用户列表成功!')
  ElMessage.userList = res.data.users
  ElMessage.total = res.data.total
  // console.log(res)
},
  // 监听 pagesize 改变事件 每页显示的个数
  handleSizeChange = (newSize) => {
    // console.log(newSize)
    queryInfo.pagesize = newSize
    getUserList()
  },
  // 监听 页码值 改变的事件 当前页面值
  handleCurrentChange = (newPage) => {
    console.log(newPage)
    queryInfo.pagenum = newPage
    getUserList()
  },
  // 监听Switch状态的改变
  userStatuChanged = async (userInfo) => {
    // console.log(userInfo)
    const { data: res } = await api.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
    if (res.meta.status !== 200) {
      userInfo.mg_state = !userInfo.mg_state
      return ElMessage.error('更新用户状态失败!')
    }
    return ElMessage.success('更新用户状态成功!')
  },
  // 监听添加用户的对话框关闭事件
  addDislogClosed = () => {
    addFormRef.value.resetFields()
  },
  // 点击按钮,添加新用户
  addUser = () => {
    addFormRef.validate(async valid => {
      console.log(valid)
      if (!valid) return
      // 可以发起添加用户请求
      const { data: res } = await api.post('users', addForm)
      if (res.meta.status !== 201) {
        return ElMessage.error('用户添加失败了~')
      }
      // 隐藏添加用户的对话框
      addDialogVisible = false
      // 添加成后重新获取用户数据,不需要用户手动刷新
      getUserList()
      return ElMessage.success('用户添加成功了~')
    })
  },
  // 展示编辑用于的对话框
  showEditDialog = async (id) => {
    const { data: res } = await $http.get('users/' + id)
    if (res.meta.status !== 200) {
      return ElMessage.error('查询用户数据失败~')
    }
    editForm = res.data
    console.log(res)
    editDialogVisble = true
    return ElMessage.success('查询用户数据成功~')
  },
  // 监听修改用户对话框的关闭事件
  aditClosed = () => {
    $refs.editFormRef.resetFields()
  },
  editUserInfo = () => {
    $refs.editFormRef.validate(async valid => {
      console.log(valid)
      if (!valid) return
      // 发起修改用户信息的数据请求
      const { data: res } = await $http.put('users/' + editForm.id, {
        email: editForm.email,
        mobile: editForm.mobile
      })
      if (res.meta.status !== 200) {
        ElMessage.error('更新用户信息失败!')
      }
      editDialogVisble = false
      getUserList()
      ElMessage.success('更新用户信息成功!')
    })
  },
  // 根据id删除对应的用户信息
  removeUserById = async (id) => {
    // 询问用户是否删除用户
    const confirmRusult = await $confirm('此操作将永久删除该文件, 是否继续?', '永久删除该用户', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).catch(err => err)
    console.log(confirmRusult)
    // 用户点击了删除,则返回字符串 confirm
    // 用户取消了删除,则返回字符串 cancel
    if (confirmRusult !== 'confirm') {
      return ElMessage.info('已经取消了删除')
    }
    api.delete('users/' + id).then(res => {
      const { data: response } = res
      console.log(response)
      if (response.meta.status !== 200) {
        return ElMessage.error('该用户删除失败')
      }
      ElMessage.success('该用户已经删除')
      getUserList()
    })
  },
  // 展示分配角色的对话框
  setRoles = async (userInfo) => {
    userInfo = userInfo
    // 再展示对话框之前获取所有的角色列表
    const { data: res } = await api.get('roles')
    if (res.meta.status !== 200) {
      return ElMessage.error('获取角色列表失败!')
    }
    rolesList = res.data
    setRolesDialogVisible = true
  }
// 点击按钮,分配角色
saveRolesInfo = async () => {
  if (!selectRoleId) {
    return ElMessage.error('请选择要分配的角色!')
  }
  const { data: res } = await api.put(`users/${userInfo.id}/role`, {
    rid: selectRoleId
  })
  if (res.meta.status !== 200) {
    return ElMessage.error('更新角色失败!')
  }
  ElMessage.success('更新角色成功!')
  getUserList()
  setRolesDialogVisible = false
}
// 分配角色对话框关闭
setRolesDialogClosed = () => {
  selectRoleId = ''
  userInfo = ''
}

</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
