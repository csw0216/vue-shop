<template>
    <div class="login_container">
        <div class="login_box">
            <!--      头像区域-->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="" />
            </div>
            <!-- 表单提交区域 -->
            <!-- 用rules和prop进行表单校验 -->
            <el-form label-width="0px" :rules="loginFormRules" class="login_form" ref="loginFormRef" status-icon
                :model="loginForm">
                <!--        用户名-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="Please Input" prefix-icon="UserFilled">

                    </el-input>
                </el-form-item>
                <!--        密码-->
                <el-form-item prop="password">

                    <el-input type="password" v-model="loginForm.password" prefix-icon="Lock">
                    </el-input>
                </el-form-item>
                <!--        按钮区-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
// 创建响应式对象
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
// 从父组件接收数据使用的
// 通过 defineProps 定义的 props 是只读的
// defineProps({

// });


// 使用网络请求封装的接口
import api from "../api/index.js"
import axios from "axios"

const router = useRouter()
const loginLoading = ref(false);// 登录限制
const loginFormRef = ref(null)
const loginForm = reactive({
    // 登录的表单数据的绑定对象
    username: '',
    password: ''
});

const loginFormRules = {
    // 验证用户名是否合法
    username: [
        { required: true, message: '请输入登录名称', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    // 验证密码是否合法
    password: [
        { required: true, message: '请输入登录密码', trigger: 'blur' },
        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
    ]
}

// 重置表单
const resetLoginForm = () => {
    loginFormRef.value.resetFields()
    ElMessage.info('表单已重置')
}


const login = () => {
    loginLoading.value = true
    loginFormRef.value.validate(async valid => {
        if (!valid) {
            loginLoading.value = false
            // console.log("空白")
            return;
        }
        await api.getLogin(loginForm).then(res => {
            // console.log(res.data);
            if (res.data.status !== 200) {
                loginLoading.value = false
                return ElMessage.warning('登录失败 帐号或密码错误!')
            } else {
                ElMessage.success('登录成功!')
                // 1. 将登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中 localStorage(持久话机制/关闭页面也不会忘记数据)
                //   1.1 项目中除了登录之外的API接口,必须在登录之后才能访问
                //   1.2 token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage中
                window.sessionStorage.setItem('token', res.data.data.token)
            }
        })


        // 2. 通过编程式路由导航跳转到后台主页,路由地址是 /home
        const navigationResult = await router.push('/home')
        if (navigationResult) {
            // 导航被阻止
            ElMessage.error('跳转失败!')
        } else {
            // 导航成功 (包括重新导航的情况)
            // this.isMenuOpen = false
            ElMessage.success('跳转成功!')
        }
        loginLoading.value = false
    })
}






</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);


    .avatar_box {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eeeeee;
        }


    }

    .login_form {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
}
</style>