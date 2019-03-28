<template>
  <div>
    <div class="search">
      <div class="sear1">
        <router-link to="/index">
          <span class="back">返回首页</span>
        </router-link>
        <router-link to="/search">
          <input type="text" class="seaript" placeholder="搜索饿了么商家、商品名称" v-model="searchipt">
        </router-link>
      </div>
      <ul>
        <li v-for="(e,i) in serachData" :key="i">
          <img :src="e.url" alt>
          <p style="text-align:center;">{{e.title}}</p>
        </li>
      </ul>
    </div>

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
import Axios from "axios"
export default {
  data() {
    return {
      searchipt: "",
      menuArr: ""
    };
  },
  methods: {
    getmenu(){
      Axios.get("http://localhost:3000/getMenuArr").then((res)=>{
        this.menuArr = res.data
        console.log(res.data)
      })
    },
  },
  mounted() {
    this.getmenu();
  },
  computed: {
    serachData() {
      if (this.searchipt) {
        // 创建一个新数组，过滤     true false
        let newarr = this.menuArr.filter(e => {
          if (e.title.indexOf(this.searchipt) != -1) {
            return true;
          } else {
            return false;
          }
        });
        return newarr;
      } else {
        return [];
      }
    }
  }
};
</script>

<style scoped>
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
		.sear {
			width: 100%;
			padding: 30px 0 20px 0;
			background: lightblue;
		}

		.sear1 {
			width: 100%;
			background: lightblue;
			padding-bottom: 30px;
		}

		.seaript {
			display: block;
			width: 90%;
			margin: 0 auto;
			padding: 8px 0;
			border: none;
			text-align: center;
			/* font-size: 30px; */
		}
</style>
