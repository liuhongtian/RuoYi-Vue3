<template>
  <div class="left-top">
    <span class="login-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 128 128"><path fill="#ffffff" d="M63.9 56.6c-4 .4-7.6 3.8-7.3 8c.3 3.9 3.2 7.1 7 7.6c4.1.6 8-1.9 8.9-6.2c1-5.4-3.3-9.9-8.6-9.4m9.3 36.9c-.5-2.6-1.2-5.1-1.8-7.6c-.6-2.7-1.5-5.5-2.6-7.9c-1.6-3.5-5.4-4.7-7.7-1.7c-1.9 2.5-3.3 6.5-4.1 9.6c-2.4 8.9-9.5 35.9 6 38.1c4 .5 8-2.1 9.8-5.8c2.2-4.8 2.1-10.2 1.6-15.4c-.2-2.6-.7-6.8-1.2-9.3M123.9 63c-2.1-15.6-29.1-8.5-38-6c-3.1.8-7.1 2.2-9.6 4.1c-3.1 2.3-1.8 6.2 1.7 7.7c2.5 1.1 5.3 1.9 7.9 2.6c2.5.6 5.1 1.2 7.6 1.8c2.5.5 6.7 1 9.3 1.2c5.2.5 10.6.7 15.4-1.6c3.6-1.7 6.3-5.8 5.7-9.8m-72.2-1.9c-2.5-1.9-6.5-3.2-9.6-4.1c-8.9-2.4-35.9-9.5-38 6c-.5 4 2.1 8 5.8 9.8c4.7 2.2 10.2 2.1 15.4 1.6c2.6-.2 6.8-.7 9.3-1.2c2.6-.5 5.1-1.2 7.6-1.8c2.7-.6 5.5-1.5 7.9-2.6c3.5-1.5 4.7-5.3 1.6-7.7m29.7-10.9c.3 0 .7-.1 1-.3c2.6-1.9 25.8-18.8 27.5-20.5c.8-.8 2.2-2.4 3-4.4c.9-2.5.4-4.8-1.4-6.6c-1.2-1.2-2.8-1.9-4.4-1.9c-2.7 0-5.3 1.7-6.9 3.2c-1.6 1.7-18.3 25.1-20.2 27.8c-.5.7-.4 1.6.2 2.2c.3.3.8.5 1.2.5M18.1 29.3C19.8 31 43 47.9 45.6 49.8c.3.2.7.3 1 .3c.4 0 .9-.2 1.2-.5c.6-.6.7-1.5.2-2.2c-1.9-2.7-18.5-26.1-20.3-27.8c-1.6-1.6-4.2-3.2-6.9-3.2c-1.7 0-3.2.6-4.4 1.9c-1.8 1.8-2.3 4.1-1.4 6.6c.8 2 2.3 3.6 3.1 4.4m91.8 69.4C108.2 97 85 80.1 82.4 78.2c-.7-.5-1.6-.4-2.2.2s-.7 1.5-.2 2.2c1.9 2.7 18.5 26.1 20.3 27.8c1.6 1.6 4.2 3.2 6.9 3.2c1.7 0 3.2-.6 4.4-1.9c1.8-1.8 2.3-4.1 1.4-6.6c-.8-2-2.3-3.6-3.1-4.4M45.6 78.2C43 80.1 19.8 96.9 18.1 98.7c-.8.8-2.2 2.4-3 4.4c-.9 2.5-.4 4.8 1.4 6.6c1.2 1.2 2.8 1.9 4.4 1.9c2.7 0 5.3-1.7 6.9-3.2c1.7-1.7 18.4-25.2 20.3-27.8c.5-.7.4-1.6-.2-2.2c-.7-.7-1.6-.7-2.3-.2"></path><path fill="#FFF" d="M109.17 19.98c-.59-1.44-2.73-1.48-4.78-.39c-1.65.88-3.17 2.76-2.07 4.2c1.14 1.49 2.73-.47 4.2-1.37c1.48-.89 3.2-1.11 2.65-2.44m-85.8-.21c-.59-1.44-2.73-1.48-4.78-.39c-1.65.88-3.17 2.76-2.07 4.2c1.14 1.49 2.73-.47 4.2-1.37c1.49-.89 3.2-1.11 2.65-2.44" opacity=".3"></path><path fill="#ffffff" d="M61.1 51.7c2.3 3.1 6.2 1.8 7.7-1.7c1.1-2.5 1.9-5.3 2.6-7.9c.6-2.5 1.2-5.1 1.8-7.6c.5-2.5 1-6.7 1.2-9.3c.5-5.2.7-10.6-1.6-15.4C71.1 6.1 67 3.5 63 4c-15.6 2.1-8.5 29.1-6 38.1c.9 3.2 2.2 7.2 4.1 9.6"></path><path fill="#FFF" d="M68.07 8.72c-.89-2.18-4.13-2.24-7.24-.59c-2.5 1.33-4.8 4.18-3.13 6.36c1.73 2.26 4.13-.71 6.36-2.07c2.23-1.37 4.85-1.69 4.01-3.7" opacity=".3"></path></svg>
      欢迎来到智慧校园
    </span>
  </div>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form right-bottom">
      <h3 class="title">{{ title }}</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" size="large" auto-complete="off" placeholder="密码"
          @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input v-model="loginForm.code" size="large" auto-complete="off" placeholder="验证码" style="width: 63%"
          @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="large" type="success" style="width:100%;" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2025 All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUserStore from '@/store/modules/user'

const title = import.meta.env.VITE_APP_TITLE;
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const loginForm = ref({
  username: "admin",
  password: "admin123",
  rememberMe: false,
  code: "",
  uuid: ""
});

const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }]
};

const codeUrl = ref("");
const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(true);
// 注册开关
const register = ref(false);
const redirect = ref(undefined);

watch(route, (newRoute) => {
  redirect.value = newRoute.query && newRoute.query.redirect;
}, { immediate: true });

function handleLogin() {
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 });
        Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 });
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
      } else {
        // 否则移除
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
      // 调用action的登录方法
      userStore.login(loginForm.value).then(() => {
        const query = route.query;
        const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
          if (cur !== "redirect") {
            acc[cur] = query[cur];
          }
          return acc;
        }, {});
        router.push({ path: redirect.value || "/", query: otherQueryParams });
      }).catch(() => {
        loading.value = false;
        // 重新获取验证码
        if (captchaEnabled.value) {
          getCode();
        }
      });
    }
  });
}

function getCode() {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.value.uuid = res.uuid;
    }
  });
}

function getCookie() {
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  const rememberMe = Cookies.get("rememberMe");
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  };
}

getCode();
getCookie();
</script>

<style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #084b05;
}

.login-title {
  font-size: 80px;
  align-items: center;
  color: #ffffff;
}

.left-top {
  position: absolute;
  top: 150px;
  left: 100px;
  padding: 10px;
}

.right-bottom {
  position: absolute;
  bottom: 200px;
  right: 100px;
  padding: 10px;
}

.login-form {
  border-radius: 6px;
  background: #80bd88;
  opacity: 0.88;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 40px;

    input {
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 40px;
  padding-left: 22px;
}
</style>
