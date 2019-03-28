<template>
  <div class="us">
    <!-- 顶部登录注册 -->
    <div class="us-top">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAM1BMVEXE5/XI6fbT7fjW7/jl9fvw+f3////a8Pnt+PzL6vb7/v7i8/rP7Pf4/P7e8vn0+/3p9vvI4mwRAAACI0lEQVR4Ae3YBxbkIAgGYDCKgqbc/7LbS5hJexvMNr7Xp/0j9oBzzjnnnHPOuX8Qhq/wycwhJvopxQGfSM2F3pXcOZuj0DaJDN1gpSMRoY9B6Jhk6AALnSsI1tpIV0jrX+ZHyp3putwzN9XA8BmHmvolN1LGCWENp5GUADZYVGyGd1lFC4OJmVYqbKu0MoOFem22TPrv3cf004ywa6A1htvStdw2Go+vcC03C5EuzV3pSv/iQsqCllN4gj1tJmWC+342JV1dx8cGBuR8nEbznVHNkQW28UxKBeV+pRtsCrrMEsDGeLIIVlISgg08HqiYSIlgJRxWuoku8wA2VCU3dwVlZugQnE4PnYt+t05wR6FvysmeIPltrC8mC3U97t65bRQq9whO23uC6gRp9sFMa9NOJ8z2wWF3T1BvDfdXzLLb4oL7a1m9P53mq50PwSR42ltA2v6eEC2uFGH38Ja39wRVDUGDTSJudH+ETSg3G6wuESO8anxSpww3xF+aGvX+yWvQZ72rohQ0O+wFeI6q9QiPYr0cPGih31Rs1pfjBy2/KxnlYjJPtTYwNFy7CE5CnyzGxf4pMWzhQkTWyTjTWkV4hVW6PNhjIWUZdF+okgiDnSakSakhMHAItQhpAXom7xN+8nG1OnTawkRXJARzlc5V6KElOpYadJJH2jdm6CjPtG3O0FmL780eY4MncI5J6CtJMTM8iwODc84555xzzv0PPgKMKi2olgNo0QAAAABJRU5ErkJggg=="
        alt
      >
      <div class="us-top-right" v-show="isShow">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
        <input type="button" value="注销" @click="zhuxiao()">
        <br>登录后享受更多特权
      </div>
      <div class="us-top-right1" v-show="isShow1">
        <p>欢迎您：{{userNAME}}</p>
        <p>
          <input type="button" value="修改信息" @click="tabshow">
          <input type="button" value="退出登录" @click="out()">
        </p>
      </div>
    </div>
    <div class="chan" v-show="isShow2">
      <span class="close" @click="tabshow">X
      </span>
      <input type="text" placeholder="手机号" v-model="username">
      <br>
      <input type="text" placeholder="原密码">
      <br>
      <input type="text" placeholder="新密码" v-model="password">
      <br>
      <input type="submit" value="确认修改" @click="change()">
    </div>
    <!-- 红包金币 -->
    <div class="redbag">
      <div>
        <img src="../img/redbag.png" alt>
        <p>红包</p>
      </div>
      <div>
        <img src="../img/xianjin.png" alt>
        <p>金币</p>
      </div>
    </div>
    <div class="adress">
      <div>
        <p>
          <span>
            <img src="../img/adress.png" alt>
            我的地址
          </span>
          <span class="lt">></span>
        </p>
      </div>
      <div>
        <p style="border-bottom:1px solid #ddd;">
          <span>
            <img src="../img/ele1.png" alt>
            金币商城
          </span>
          <span class="lt">></span>
        </p>
        <p>
          <span>
            <img src="../img/ele2.png" alt>
            分享拿10元现金
          </span>
          <span class="lt">></span>
        </p>
      </div>
      <div>
        <p>
          <span>
            <img src="../img/ele3.png" alt>我的客服
          </span>
          <span class="lt">></span>
        </p>
        <p style="border-bottom:1px solid #ddd;border-top:1px solid #ddd;">
          <span>
            <img src="../img/ele4.png" alt>下载饿了么APP
          </span>
          <span class="lt">></span>
        </p>
        <p>
          <span>
            <img src="../img/ele5.png" alt>规则中心
          </span>
          <span class="lt">></span>
        </p>
      </div>
    </div>
    <!-- 隐私政策 -->
    <div class="yszc">隐私政策</div>
    <!-- 底部导航栏 -->
    <div class="bot-nav">
      <router-link to="/index">
        <img src="../img/index.png">
      </router-link>
      <!-- <router-link to="/faxian">发现</router-link> -->
      <router-link to="/dingdan">
        <img src="../img/dingdan.png">
      </router-link>
      <router-link to="/us">
        <img src="../img/us.png">
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      isShow: true,
      isShow1: false,
      isShow2: false,
      userNAME: "asdasdas",
      username:"",
      password:"",
    };
  },
  methods: {
    ifLOG() {
      let NowUserInfo = JSON.parse(localStorage.getItem("NowUserInfo"));
      if (NowUserInfo) {
        console.log(this.userNAME);
        console.log(this.isShow1);
        console.log(this.isShow);
        this.userNAME = NowUserInfo.userNAME;
        this.isShow1 = true;
        this.isShow = false;
      }
    },
    out() {
      let NowUserInfo = JSON.parse(localStorage.getItem("NowUserInfo"));
      if (NowUserInfo) {
        this.userNAME = NowUserInfo.userNAME;
        this.isShow1 = true;
        this.isShow = false;
        localStorage.removeItem("NowUserInfo");
        localStorage.removeItem("loginFlag");
        alert("退出登录成功");
        this.$router.push({ path: "/login" });
      }
    },
    zhuxiao() {
      let NowUserInfo = JSON.parse(localStorage.getItem("NowUserInfo"));
      if (NowUserInfo) {
        let params = new URLSearchParams();
        params.append("id", NowUserInfo.id);
        Axios.post("http://localhost:3000/out", params).then(res => {
          console.log(res.data);
        });
        localStorage.removeItem("NowUserInfo");
        localStorage.removeItem("loginFlag");
        alert("退出登录成功");
        this.$router.push({ path: "/login" });
      }
    },
    tabshow(){
      this.isShow2 = !this.isShow2
    },
    change() {
      let NowUserInfo = JSON.parse(localStorage.getItem("NowUserInfo"))
      // console.log(NowUserInfo.id)
        let params = new URLSearchParams();
        params.append("username", this.username);
        params.append("password", this.password);
        params.append("id", NowUserInfo.id);
        Axios.post("http://localhost:3000/change", params).then(res => {
          console.log("当前用户登录信息", res.data);
          localStorage.setItem("NowUserInfo",JSON.stringify(res.data))
          alert("修改成功，请重新登录")
          this.isShow2 = !this.isShow2
          this.$router.push({path:"/login"})
        });
    }
  },
  mounted() {
    this.ifLOG();
  }
};
</script>

<style scoped>
.us {
  width: 100%;
  background: #e9e9e9;
}
.us-top {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-image: linear-gradient(90deg, #0af, #0085ff);
  padding: 20px 0;
}
.us-top img {
  width: 20%;
  border-radius: 50%;
  height: 100%;
}
.us-top-right {
  width: 60%;
  font-size: 12px;
  color: white;
}
.us-top-right1 {
  width: 60%;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: space-around;
}
.us-top-right a {
  color: white;
  font-size: 18px;
}
.us-top-right1 input {
  background: greenyellow;
  border: none;
  height: 30px;
  padding: 3px 20px;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  /* margin-left: 20px; */
  margin: 5px 0;
}
.us-top-right1 p {
  font-size: 18px;
  color: white;
  width: 60%;
}
.redbag {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
}
.redbag div {
  display: table-cell;
  width: 49.5%;
  text-align: center;
  border: solid 1px #ddd;
  padding: 20px 0;
  font-size: 14px;
}
.redbag div img {
  width: 17%;
}
.adress div {
  /* width: 95%; */
  /* margin: 0 auto; */
  margin-top: 20px;
  font-size: 18px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background: #fff;
}
.adress div p {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-flow: wrap row;
  justify-content: space-between;
  /* border-bottom: 1px solid #eee; */
  padding: 10px 0px;
  font-size: 14px;
}
.adress div p img {
  width: 16%;
  vertical-align: bottom;
}
.lt {
  color: #bbb;
  font-size: 18px;
}
.yszc {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  background: #e9e9e9;
  color: #4da6f0;
}
.bot-nav {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  z-index: 2;
  bottom: 0;
  list-style: none;
  text-decoration: none;
  background: #fff;
}
.bot-nav a {
  color: #7a7a7a;
}
.chan{
  width:60%;
  /* height: 200px; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #e9e9e9;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
}
.chan input{
  height: 20px;
  margin: 15px 0;
  padding: 5px 10px;
  border: solid 1px #ccc;
  border-radius: 10px;
}
.chan input[type=submit]{
  background: greenyellow;
  border: none;
  height: 30px;
  padding: 3px 20px;
  border-radius: 10px;
  color: white;
  font-size: 18px;
}
.close{
  position: absolute;
  right: 10px;
  top:10px;
  color: gray;
}
</style>
