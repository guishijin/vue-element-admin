<template>
  <div id="main">
    <div class="title">贪吃蛇游戏</div>
    <div class="scoreDiv">得分：0分</div>
    <div id="mainDiv"></div>
    <button id="button_">start</button>
    <button id="button_1">pause</button>
    <button id="button_2">restart</button>
  </div>
</template>

<script>
  export default {
    name: 'Snake'
  }
</script>

<style scoped>
  #mainDiv {
    overflow: hidden;
    font-size: 0px;
    margin: auto;
    border: 1px solid black;
  }

  #main {
    border: 3px solid black;
    margin: auto;
    background: lightcyan;
  }

  .col {
    width: 15px;
    border: 1px solid gray;
    height: 15px;
    display: inline-block;
    background: seashell;
  }

  .activeSneck {
    background: black;
  }

  .egg {
    background: red;
    border-radius: 50%;
  }

  .scoreDiv {
    float: right;
    width: 100px;
    color: red
  }

  .title {
    text-align: center;
    font-size: 2rem;
    color: silver;
    text-shadow: 2px 2px 12px yellow;
  }

  #button_ {
    margin-left: 23%;
    display: inline-block;
  }

  button {
    width: 60px;
    height: 25px;
    background: palegoldenrod;
    color: orange;
    font-size: 16px;
  }
  /*#button_2{
        width: 120px;
        }*/
</style>
