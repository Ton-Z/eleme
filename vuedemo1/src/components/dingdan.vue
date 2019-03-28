<template>
  <div class="dingdan">订单
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
    <router-link to="/datails">返回详情</router-link>
    <table>
      <thead>
        <tr>
          <th>好吃哒~~</th>
          <th>听说漂亮的人都
            <br>有好听的名字
          </th>
          <th>客官，再来
            <br>一个否
          </th>
          <th>价值喔</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e,i) in shopArr" :key="i">
          <td>
            <img :src="e.url" alt>
          </td>
          <td>{{e.name}}</td>
          <td>
            <span class="jian" @click="produce(i)">-</span>
            <span class="count">{{e.count}}</span>
            <span class="jia" @click="jiayi(i)">+</span>
          </td>
          <td>{{e.price}}</td>
          <td>
            <span @click="del(i)">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      已选这么多啦
      <span>{{zongjia}}</span>元
    </p>
  </div>
</template>

<script>
var indexArr = [];
var shopArr = [];
var shopArr1 = [];
import Axios from "axios";
export default {
  data() {
    return {
      count: "",
      zongjia: 0,
      index: "",
      shopArr: [],
      shop: [],
      ind: ""
    };
  },
  methods: {
    produce(i) {
      if (this.shopArr[i].count > 1) {
        this.shopArr[i].count--;
      } else {
        this.shopArr[i].count = this.shopArr[i].count;
      }
      let params = new URLSearchParams();
      params.append("shopcar", JSON.stringify(this.shopArr));
      Axios.post("http://localhost:3000/producecount", params).then(res => {
        // console.log(res.data)
        this.show();
        this.zon();
      });
    },
    jiayi(i) {
      this.shopArr[i].count++;
      let params = new URLSearchParams();
      params.append("shopcar", JSON.stringify(this.shopArr));
      Axios.post("http://localhost:3000/addcount", params).then(res => {
        // console.log(res.data)
        this.show();
        this.zon();
      });
    },
    show() {
      Axios.get("http://localhost:3000/sendshopcar").then(res => {
        // console.log(res.data);
        this.shopArr = res.data;
        this.zon();
      });
    },
    zon() {
      //获取总价
      let z = 0;
      for (let i in this.shopArr) {
        z += this.shopArr[i].price * this.shopArr[i].count;
      }
      this.zongjia = z;
    },
    del(i) {
      //直接删除
      console.log(i);
      let params = new URLSearchParams();
      params.append("index", i);
      Axios.post("http://localhost:3000/removeshopi", params).then(res => {
        console.log(res.data);
        this.show();
        this.zon();
      });
    },
    loginFlag() {
      var loginFlag = localStorage.getItem("loginFlag");
      if (loginFlag == null) {
        alert("还没有登录哦");
        this.$router.push({ path: "/login" });
      }
    }
  },
  mounted() {
    this.show();
    this.zon(); //每次变化修改总价
    this.loginFlag();
  }
};
function a(a,b) {
  let params = new URLSearchParams();
  params.append("a",a);
  Axios.post("http://localhost:3000/"+b, params).then(res => {
    console.log(res.data);
    // this.show();
    // this.zon();
  });
}
</script>

<style>
.bot-nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
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
.jian {
  padding: 3px;
  float: left;
  border: solid 1px;
}

.jia {
  padding: 3px;
  float: left;
  border: solid 1px;
}

.count {
  width: 20px;
  padding: 3px;
  border-left: none;
  border-right: none;
  float: left;
  border: solid 1px;
  text-align: center;
}
.datails,
.dingdan {
  font-size: 12px;
  border-collapse: collapse;
  /* text-align: center; */
}

.datails td,
th,
.dingdan td,
th {
  padding: 5px;
  text-align: center;
}

.datails td img,
.dingdan td img {
  width: 60px;
  height: 60px;
}
</style>
