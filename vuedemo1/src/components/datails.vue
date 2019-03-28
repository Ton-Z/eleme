<template>
  <div class="datails">
    <!-- {{$route.query}} -->
    <router-link to="/index">返回首页</router-link>
    <table>
      <thead>
        <tr>
          <th>好吃哒~~</th>
          <th>听说漂亮的人都有好听的名字</th>
          <th>价值喔</th>
          <th>喜欢吗</th>
        </tr>
      </thead>
      <tbody>
        <!-- {{shop}} -->
        <tr v-for="(e,i) in shop1" :key="i">
          <td>
            <img :src="e.url" alt>
          </td>
          <td>{{e.name}}</td>
          <td>{{e.price}}</td>
          <td>
            <!-- <router-link :to="{name:'dingdan',params:{shop:shop,index:i}}"> -->
            <span @click="addshopcar(i)">就你啦</span>
            <!-- </router-link> -->
          </td>
        </tr>
      </tbody>
    </table>
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
  </div>
</template>

<script>
import Axios from "axios";
var dingdanshop = [];
var loginFlag = false;
var dingdanindex = "";
export default {
  data() {
    return {
      shop: [],
      shop1: []
    };
  },
  methods: {
    ifLogin(i) {
      let loginFlag = localStorage.getItem("loginFlag");
      console.log(loginFlag);
      if (loginFlag == null) {
        alert("您还没有登录喔");
        this.$router.push({ path: "/denglu" });
      } else {
        dingdanindex = i;
        //储存点击商品的索引，通过该索引渲染购物车
        localStorage.setItem("dingdanindex", i);
        this.$router.push({ path: "/dingdan" });
      }
    },
    //menu传过来的商品信息写入数据库保存，再获取
    send() {
      
      let params = new URLSearchParams();
      params.append("shop1", this.$router.currentRoute.query.shop);
      Axios({
        method: "post",
        url: "http://localhost:3000/shop1",
        data: params
      });
    },
  //从数据库获取menu传过来商品信息
    get() {
      Axios({
        method: "get",
        url: "http://localhost:3000/getshop1"
      }).then(res => {
        // console.log(res);
        this.shop1 = res.data;
        dingdanshop = res.data;
      });
    },
    //向购物车中加商品，判断用户有没有登录
    addshopcar(i) {
      let loginFlag = localStorage.getItem("loginFlag");
      // console.log(loginFlag);
      if (loginFlag == null) {
        alert("您还没有登录喔");
        this.$router.push({ path: "/denglu" });
      } else {
        let params = new URLSearchParams()
        params.append("id",i)
        Axios.post("http://localhost:3000/addshop",params).then((res)=>{
          localStorage.setItem("shopcar",JSON.stringify(res.data))
        })
        this.$router.push({ path: "/dingdan" });
      }
    }
  },
  mounted() {
    if (this.$router.currentRoute.query.shop != "") {
      this.send();
    }
    setTimeout(this.get, 1);
  }
};
</script>

<style scoped>
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
</style>
