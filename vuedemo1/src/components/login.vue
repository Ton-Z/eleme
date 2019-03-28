<template>
  <div class="login">
    <div class="login-top">
      <img src="../img/Image1.png">
    </div>
    <div class="login-main">
      <p class="getYan">
        <span>获取验证码</span>
        <input type="text" placeholder="手机号" v-model="username">
        <br>
      </p>
      <p>
        <input type="text" placeholder="密码" v-model="password">
        <br>
      </p>
      <p id="xy">
        新用户登录即自动注册，并表示已同意
        <span>《用户服务协议》</span>
      </p>
      <p>
        <input type="submit" value="登录" @click="login()">
      </p>
      <p>关于我们</p>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      let usernameArr = [];
      let passwordArr = [];
      let userIDArr = [];
      Axios.get("http://localhost:3000/getUser").then(res => {
        console.log(res.data);
        for (let i in res.data) {
          usernameArr.push(res.data[i].username);
          passwordArr.push(res.data[i].passwordsure);
          userIDArr.push(res.data[i].id);
        }
        if (usernameArr.indexOf(this.username) == -1) {
          alert("您还没有注册");
          this.$router.push({ path: "/register" });
        } else {
          if (
            this.password != passwordArr[usernameArr.indexOf(this.username)]
          ) {
            alert("密码错误");
          } else {
            alert("登录成功");
            localStorage.setItem(
              "NowUserInfo",
              JSON.stringify({
                id: userIDArr[usernameArr.indexOf(this.username)],
                userNAME:usernameArr[usernameArr.indexOf(this.username)],
                userpass:passwordArr[usernameArr.indexOf(this.username)]
              })
            );
            localStorage.setItem("loginFlag","true")
            this.$router.push({path:'/us'})
            // this.$router.push({ path: "/index" });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.login-top {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}
.login-top > img {
  width: 30%;
}
.login-main {
  width: 100%;
  height: 350px;
  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;
  align-content: space-around;
  text-align: center;
}
.login-main p {
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
.login-main input[type="text"] {
  width: 80%;
  padding: 15px 10px;
  font-size: 16px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
}
.login-main input[type="submit"] {
  width: 85%;
  padding: 15px 0;
  border: none;
  border-radius: 5px;
  color: white;
  background: #4cd96f;
}
.login-main:last-child {
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
