<template>
  <div class="register">
    <router-link to="/login">
      <input type="button" value="返回登录">
    </router-link>
    <div class="register-top">
      <img src="../img/Image1.png">
    </div>
    <div class="register-main">
      <p class="getYan">
        <span>获取验证码</span>
        <input type="text" placeholder="用户名" v-model="username">
      </p>
      <p>
        <input type="text" placeholder="密码" v-model="password">
      </p>
      <p>
        <input type="text" placeholder="确认密码" v-model="passwordsure">
      </p>
      <p id="xy">新用户登录即自动注册，并表示已同意
        <span>《用户服务协议》</span>
      </p>
      <p>
        <input type="submit" value="注册" @click="sub(username,password,passwordsure)">
      </p>
      <p>关于我们</p>
    </div>
  </div>
</template>

<script>
import Axios from "Axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      passwordsure: ""
    };
  },
  methods: {
    sub(username, password, passwordsure) {
      if (password == passwordsure) {
        let params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        params.append("passwordsure", passwordsure);
        Axios.post("http://localhost:3000/register", params).then(res => {
          console.log("当前用户登录信息", res.data);
          alert(res.data);
          this.$router.push({ path: "/login" });
        });
      } else {
        alert("两次密码输入不一致");
        this.passwordsure = "";
      }
    }
  }
};
</script>

<style>
.register-top {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}
.register-top > img {
  width: 30%;
}
.register-main {
  width: 100%;
  height: 350px;
  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;
  align-content: space-around;
  text-align: center;
}
.register-main p {
  width: 90%;
  margin: 0 auto;
}
#xy {
  width: 80%;
  margin: 0 auto;
  text-align: left;
  color: #999;
  font-size: 16px;
  line-height: 20px;
}
#xy span {
  color: #2395ff;
}
.register-main input[type="text"] {
  width: 80%;
  padding: 15px 10px;
  font-size: 16px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
}
.register-main input[type="submit"] {
  width: 85%;
  padding: 15px 0;
  border: none;
  border-radius: 5px;
  color: white;
  background: #4cd96f;
}
.register-main:last-child {
  font-size: 12px;
  color: #999;
}
.getYan {
  position: relative;
}
.getYan > span {
  position: absolute;
  right: 40px;
  top: 25px;
  font-size: 16px;
}
</style>
