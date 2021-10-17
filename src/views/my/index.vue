<template>
  <div class="my-container">
<!--    <van-cell-group v-if="user" class="my-info">-->
    <van-cell-group class="my-info">
      <van-cell
         class="base-info"
         title="单元格"
         value="内容"
         center
         :border="false"
       >
      <template v-slot:icon>
        <van-image
          class="avater"
          round
          fit="cover"
          :src="require('./touxiang.jpg')"
        />
<!--        :src="currentUser.phone"-->
<!--        <div class="name" slot="title">{{currentUser.name}}</div>-->
      </template>
         <template v-slot:title>
          <span class="name">宇宙无敌小可爱</span>
           </template>
         <van-button
           class="update-btn"
           size="small"
           round
         >编辑资料</van-button>
       </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <template v-slot:text>
            <div class="count">123</div>
            <div class="text">头条</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template v-slot:text>
            <div class="count">123</div>
            <div class="text">关注</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template v-slot:text>
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template v-slot:text>
            <div class="count">123</div>
            <div class="text">获赞</div>
          </template>
        </van-grid-item>
      </van-grid>
</van-cell-group>

<!--    退出登录的页面-->
<!--    <div v-else class="no-login">-->
<!--      <div @click="$router.push('/login')">-->
<!--        <img class="mobile" src="./手机.png">-->
<!--      </div>-->
<!--      <div class="text">登录 / 注册</div>-->
<!--    </div>-->

    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="/my" />
    <van-cell class="mb-4" title="小智同学" is-link to="/my" />
<!--    <van-cell-->
<!--      v-if="user"-->
<!--      class="logout-cell"-->
<!--      title="退出登录"-->
<!--      @click="onLogout"-->
<!--    />-->
    <van-cell
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '../../api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      currentUser: {}// 当前登录用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadCurrentUser()
  },
  mounted () {
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data()
    },
    onLogout () {
      // 提示用户确定退出
      // 确定-》退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确定退出登录吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container{
  .my-info{
    background:url("./banner.png") no-repeat;
    background-size: cover;
    .base-info{
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avater{
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name{
        color: #fff;
        font-size: 15px;
      }

      .update-btn{
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info{
      .data-info-item{
        height: 65px;
        color: #fff;
        .count{
          font-size: 18px;
        }
        .text{
          font-size: 11px;
        }
}
    }
    /deep/ .van-grid-item__content{
      background-color: unset;
    }
  }

  .no-login{
    height: 180px;
    background:url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile{
      width: 66px;
      height: 66px;
    }
    .text{
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav-grid{
    .nav-grid-item{
      height: 70px;
      .toutiao{
        font-size: 22px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb-4{
    margin-bottom: 4px;
  }
}
</style>
