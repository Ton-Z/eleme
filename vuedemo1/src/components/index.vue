<template>
  <div class="index">
    <div class="index-top">
      <!-- 顶部搜索 -->
      <div class="sear">
        <h2>请选择收货地址</h2>
      </div>
      <!-- 搜索框 -->
      <div class="searchiptboc">
        <select>
          <option>选择...</option>
        </select>
        <router-link to="search">
          <input type="text" class="seaript" placeholder="搜索饿了么商家、商品名称">
        </router-link>
      </div>
      <!--menu-->
      <div class="menu">
        <ul>
          <li v-for="(e,i) in menuArr" :key="i">
            <img :src="e.url" alt>
            <router-link :to="{path:'/datails',query:{shop:JSON.stringify(e.shop)}}">
              <p>{{e.title}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 超级会员 -->
      <div class="VIP">
        <span>
          <img
            src="https://fuss10.elemecdn.com/8/0e/4dd212d831becab6e3ebd484c0941jpeg.jpeg?imageMogr/thumbnail/34x/"
            alt
          >
          <b>超级会员·</b>
          <span style="font-size:12px;">每月领20元红包</span>
        </span>
        <span>立即开通 ></span>
      </div>
      <!--轮播图-->
      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide>
          <img
            src="https://fuss10.elemecdn.com/1/9c/d8da44b63fa1208476992df88edc9jpeg.jpeg?imageMogr/thumbnail/568x/"
            alt
          >
        </swiperSlide>
        <swiperSlide>
          <img
            src="https://fuss10.elemecdn.com/4/48/37fce9a4ffbec79293357f68ecfcbjpeg.jpeg?imageMogr/thumbnail/568x/"
            alt
          >
        </swiperSlide>
        <swiperSlide>
          <img
            src="https://fuss10.elemecdn.com/6/aa/ebd67bf31e2882ee1a2c8895facefjpeg.jpeg?imageMogr/thumbnail/568x/"
            alt
          >
        </swiperSlide>
        <!-- <swiperSlide style="background: green">I'm slide 4</swiperSlide> -->
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
        <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
      <!-- 推荐商家 -->
      <div class="tjsj">
        <div class="tjsj-title">
          <div></div>
          <p>推荐商家</p>
          <div></div>
        </div>
        <ul :class="searchBarFixed == true ? 'isFixed' :''">
          <li @click="sortt1">
            {{sortt}}
            <img src="../img/ele12.png" alt>
            <div class="sortt" v-show="isShow">
              <p v-for="(e,i) in sorttArr" :key="i" @click="sortt2(e)">{{e}}</p>
            </div>
          </li>
          <li>距离最近</li>
          <li>品质联盟</li>
          <li>筛选
            <img src="../img/ele11.png" alt>
          </li>
        </ul>
        <div class="shop" v-for="(e,i) in shoplist" :key=i>
          <div class="shop-pic">
            <img :src=e.imgUrl alt="">
          </div>
          <div class="shop-right">
            <div class="shop-right-top">
              <p style="display:flex;justify-content: space-between;">
                <span style="font-size:18px;font-weight:600;">{{e.shopname}}</span>
                <span style="font-weight:00;">···</span>
              </p>
              <p>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="
                  alt
                >
                {{e.xinyong}}月售{{e.dan}}单
              </p>
              <p style="display:flex;justify-content: space-between;">
                <span>￥{{e.shopprice}}起送 | 配送费￥{{e.sendprice}}</span>
                <span>{{e.juli}} | {{e.sendtime}}分钟</span>
              </p>
              <p>
                <span class="shop-title">奶茶果汁</span>
                <span>
                  <img src="../img/ele17.png" alt>
                  口碑人气好店
                </span>
              </p>
            </div>
            <div class="shop-right-bot">
              <p>
                <span class="jian">减</span> 满25减3，满45减8，满98减10
              </p>
              <p>
                <span class="shou">首</span> 新用户下单立减21元
              </p>
            </div>
          </div>
        </div>
      </div>
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
import Axios from "axios";
import "../../bg/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      menuArr: [],
      //设置属性
      swiperOption: {
        // spaceBetween: 30, //板块间距
        loop: true, //无缝轮播
        centeredSlides: true,
        autoplay: {
          //自动轮播
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      sortt: "综合排序",
      sorttArr: [
        "好评优先",
        "起送价最低",
        "配送最快",
        "配送费最低",
        "人均从低到高",
        "人均从高到低",
        "通用排序"
      ],
      isShow: false,
      shoplist:[],
      searchBarFixed:false
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    getmenu() {
      Axios.get("http://localhost:3000/getMenuArr").then(res => {
        this.menuArr = res.data;
        console.log(res.data);
      });
    },
    sortt1() {
      this.isShow = !this.isShow;
    },
    sortt2(e) {
      this.sortt = e;
    },
    getShopList() {
      Axios.get("http://localhost:3000/getShopList").then(res => {
        this.shoplist = res.data;
        console.log(res.data);
      });
    },
    handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('.tjsj ul').offsetTop
      console.log(offsetTop)
      console.log(scrollTop)
      scrollTop >= 454 ? this.searchBarFixed = true : this.searchBarFixed = false
    }
  },
  mounted() {
    this.getmenu();
    this.getShopList(),
  window.addEventListener('scroll', this.handleScroll)
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.index-top {
  overflow-x: hidden;
}
/* 搜索 */
.sear {
  width: 100%;
  padding: 15px 0;
  background: #0088ff;
  text-align: center;
  position: fixed;
  z-index: 2;
}
.sear h2 {
  color: white;
  font-weight: 400;
  font-size: 20px;
}
.sear1 {
  width: 100%;
  background: lightblue;
  padding-bottom: 30px;
}
.searchiptboc {
  width: 90%;
  padding: 10px 0;
  margin: 0 auto;
  padding-top: 75px;
}
.searchiptboc select {
  width: 60px;
  padding: 5px 0;
  border: none;
  float: left;
  vertical-align: bottom;
}
.seaript {
  display: block;
  width: 83%;
  padding: 8px 0;
  border: none;
  text-align: center;
  background: #f2f2f2;
  /* font-size: 30px; */
}
/*menu*/
.menu ul {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}
.menu li {
  width: 18%;
  padding: 10px 3px;
  text-align: center;
  /* font-size: 30px; */
  color: #958f8f;
}
.menu li img {
  width: 80%;
}
.menu li a p {
  color: gray;
  font-size: 12px;
}
/* VIP */
.VIP {
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  background-image: linear-gradient(90deg, #ffefc4, #f3dda0);
  border-radius: 10px;
  margin: 10px 0;
}
.VIP img {
  width: 8%;
}
/* 推荐商家 */
.tjsj-title {
  width: 40%;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
}
.tjsj-title div {
  width: 30px;
  height: 1px;
  padding: 10px 0 0 0;
  border: none;
  border-bottom: solid 2px gray;
}
.isFixed{
    /* display: flex; */
    justify-content: space-between;
    position: fixed;
    top: 56.5px;
    background:white;
    padding: 15px 10px;
    z-index: 2;
}
.tjsj ul {
  /* margin: 15px 0; */
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 15px 0px;
}
.tjsj ul li{
  flex:1;
  text-align: center;
}
.tjsj ul img {
  vertical-align: bottom;
}
/* 店家 */
.shop {
  width: 95%;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #ccc;
  padding-bottom: 10px;
  margin: 20px auto;
}
/* 店家logo */
.shop-pic {
  width: 20%;
  height: 80px;
  border: solid 1px #d7d7d7;
  padding: 5px;
  position: relative;
}
.shop-pic img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.shop-right {
  width: 70%;
  font-size: 13px;
  padding: 10px;
}
.shop-right-top {
  height: 90px;
  display: flex;
  flex-flow: wrap row;
  border-bottom: solid 1px #ccc;
  padding-bottom: 5px;
}
.shop-right-top p {
  width: 100%;
}
/* 店家优惠满减 */
.shop-right-bot {
  height: 60px;
  display: flex;
  flex-flow: wrap row;
  padding: 5px 0;
}
.shop-right-bot p {
  padding: 5px 0;
}
.jian {
  background: red;
  color: white;
  padding: 3px;
  border-radius: 5px;
  font-size: 10px;
}
.shou {
  background: rgb(112, 188, 70);
  color: white;
  padding: 3px;
  border-radius: 5px;
  font-size: 10px;
}
.shop-title {
  padding: 2px 4px;
  border: solid 0.1px #c5c5c5;
}
/* 底部 */
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
/* 轮播图 */
.banner {
  width: 100%;
  height: 200px;
  position: relative;
}
.banner div {
  width: 300%;
  position: absolute;
}
.banner div img {
  width: 33.3%;
}
.swiper {
  width: 100%;
  height: 100px;
}
.swiper img {
  width: 100%;
}
swiper-slide {
  width: 100%;
  height: 100px;
}
.sortt {
  z-index: 2;
  width: 95%;
  padding: 0 10px ;
  position: absolute;
  background: white;
  text-align: left;
}
.sortt p {
  margin: 10px 0;
}
</style>
