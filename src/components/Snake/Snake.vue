<template>
  <div id="main">
    <div class="title">贪吃蛇游戏</div>
    <div class="scoreDiv">得分：0分</div>
    <div id="mainDiv"></div>
    <button id="button_" @click='button_onclick'>start</button>
    <button id="button_1" @click='button_1onclick'>pause</button>
    <button id="button_2" @click='button_2onclick'>restart</button>
  </div>
</template>

<script>
  export default {
    name: 'Snake',
    data() {
      return {
        setStartVal: 0,
        setEndVal: 2017,
        setDuration: 4000,
        setDecimals: 0,
        setSeparator: ',',
        setSuffix: ' rmb',
        setPrefix: '¥ ',
        rowNum: 30,
        colNum: 20,
        width: 15,
        height: 15,
        arr: [],
        score: 0,
        x: 2,
        y: 10,
        sneckTimer: null,
        time: 100,
        sneckBody: [],
        direction: 'right',
        eggX: 0,
        eggY: 0,
        main: null,
        mainDiv: null,
        scoreDiv: null,
        delaytime: null,
        changeDir: true
      }
    },
    methods: {
      canvasBG: function(rowNum, colNum) {
        for (let i = 0; i < rowNum; i++) {
          const row = document.createElement('div')
          // TODO: 对于VUE的方式的绑定需要深入了解
          row.style = 'width: 344px;\n' +
            '    height: 17px;\n' +
            '    overflow: hidden;\n' +
            '    font-size: 0px;\n' +
            '    margin: auto;\n' +
            '    border: 1px solid black;\n' +
            '    display: block;'
          row.className = 'rowLine'
          const rowArray = []
          for (let j = 0; j < colNum; j++) {
            const col = document.createElement('div')
            // TODO: 对于VUE的方式的绑定需要深入了解
            col.style = '    width: 17px;\n' +
              '    border: 1px solid gray;\n' +
              '    height: 17px;\n' +
              '    display: inline-block;\n' +
              '    background: seashell;'
            col.className = 'col'
            row.appendChild(col)
            rowArray.push(col)
          }
          this.mainDiv.appendChild(row)
          this.arr.push(rowArray)
        }
      },
      sneck: function() {
        for (let i = 0; i < 3; i++) {
          this.arr[this.y][i].className = 'col activeSneck'
          this.sneckBody.push(this.arr[this.y][i])
        }
      },
      sneckmove: function() {
        const self = this
        this.sneckTimer = setInterval(function() {
          console.log('this.direction = ' + self.direction)
          // 根据设置的方向来设置蛇头移动的方向。
          switch (self.direction) {
            case 'right':
              self.x++
              break
            case 'left':
              self.x--
              break
            case 'up':
              self.y--
              break
            case 'down':
              self.y++
              break
            default:
              break
          }
          if (self.y < 0 || self.y >= self.rowNum || self.x < 0 || self.x >= self.colNum) {
            alert('game over' + ' ' + '总分' + self.score)
            clearInterval(self.sneckTimer)
            return
          }
          // 判断蛇吃到自己
          for (let i = 0; i < self.sneckBody.length; i++) {
            if (self.sneckBody[i] === self.arr[self.y][self.x]) {
              alert('game over' + ' ' + '总分' + self.score)
              clearInterval(self.sneckTimer)
              return
            }
          }
          // 判断蛇头移动的位置是否有蛋
          if (self.eggX === self.x && self.eggY === self.y) {
            // TODO: 对于VUE的方式的绑定需要深入了解
            self.arr[self.eggY][self.eggX].style = '    background: black;\n' +
              '    width: 17px;\n' +
              '    border: 1px solid gray;\n' +
              '    height: 17px;\n' +
              '    display: inline-block;\n' +
              '    font-size: 0px;'
            self.arr[self.eggY][self.eggX].className = 'col activeSneck'
            // 加入到蛇身
            self.sneckBody.push(self.arr[self.eggY][self.eggX])
            self.score++
            self.scoreDiv.innerHTML = '总分:' + self.score + '分'
            self.createEgg()
          } else {
            // TODO: 对于VUE的方式的绑定需要深入了解
            self.sneckBody[0].style = '    width: 17px;\n' +
              '    border: 1px solid gray;\n' +
              '    height: 17px;\n' +
              '    display: inline-block;\n' +
              '    background: seashell;'
            self.sneckBody[0].className = 'col'
            self.sneckBody.shift()
            // TODO: 对于VUE的方式的绑定需要深入了解
            self.arr[self.y][self.x].style = '    background: black;\n' +
              '    width: 17px;\n' +
              '    border: 1px solid gray;\n' +
              '    height: 17px;\n' +
              '    display: inline-block;\n' +
              '    font-size: 0px;'

            self.arr[self.y][self.x].className = 'col activeSneck'

            self.sneckBody.push(self.arr[self.y][self.x])
          }
        }, self.time)
      },
      random_: function(max) {
        // 随机函数
        const rand = Math.floor(Math.random() * max)
        return rand
      },
      createEgg: function() {
        // 随机出新的egg的下标的x和y
        this.eggX = this.random_(this.colNum)
        this.eggY = this.random_(this.rowNum)
        // 如果即将生蛋的位置和蛇身重合，
        if (this.arr[this.eggY][this.eggX].className === 'col activeSneck') {
          // 重新生成
          this.createEgg()
        } else {
          // 否则，给新生的蛋的位置，并且修改样式
          // TODO: 对于VUE的方式的绑定需要深入了解
          this.arr[this.eggY][this.eggX].style = '    background: red;\n' +
            '    border-radius: 50%;\n' +
            '    border: 1px solid grey;\n' +
            '    width: 17px;\n' +
            '    height: 17px;\n' +
            '    display: inline-block;'
          this.arr[this.eggY][this.eggX].className = 'col egg'
        }
      },
      button_onclick: function() {
        console.log('1-开始按钮!')
        //	clearInterval(sneckTimer)
        this.sneckmove()
      },
      button_1onclick: function() {
        console.log('2-暂停按钮!')
        clearInterval(this.sneckTimer)
      },
      button_2onclick: function() {
        console.log('3-重启按钮!')
        for (let i = 0; i < this.colNum; i++) {
          for (let j = 0; j < this.rowNum; j++) {
            this.arr[j][i].className = 'col'
          }
        }
        this.x = 2
        this.y = 10
        this.sneckBody = []
        this.sneck()
        this.createEgg()
      }
    },
    mounted: function() {
      console.log('载入事件触发： mounted !')

      console.log('长度：' + this.sneckBody.length)
      // 整个轮廓
      this.main = document.getElementById('main')
      // this.main.style.width = this.colNum * this.width + this.colNum * 2 + 'px'
      // this.main.style.height = this.rowNum * this.width + this.rowNum * 2 + 36 + 18 + 'px'

      this.mainDiv = document.getElementById('mainDiv')
      // this.mainDiv.style.width = this.colNum * this.width + this.colNum * 2 + 'px'
      // this.mainDiv.style.width = this.colNum * this.width + (this.colNum - 1) * 2 + 'px'
      // this.mainDiv.style.height = this.rowNum * this.height + this.rowNum * 2 + 'px'
      this.scoreDiv = document.querySelector('.scoreDiv')
      this.canvasBG(this.rowNum, this.colNum)
      this.sneck()

      var self = this
      // 通过上下左右按键来改变direction的值，来改变蛇头的移动方向。
      document.onkeydown = function(event) {
        console.log('按键处理：this.direction = ' + self.direction)
        // 判断是否需要改变方向,ture表示需要改变，false不要
        if (!self.changeDir) {
          return // 表示直接结束函数，后续代码不执行；
        }
        const eventnew = window.event || event
        switch (eventnew.keyCode) {
          case 37:
            if (self.direction !== 'right') {
              self.direction = 'left'
            }
            break
          case 39:
            if (this.direction !== 'left') {
              this.direction = 'right'
            }
            break
          case 38:
            if (self.direction !== 'down') {
              self.direction = 'up'
            }
            break
          case 40:
            if (self.direction !== 'up') {
              self.direction = 'down'
            }
            break
          default:
            break
        }
        self.changeDir = false
        // 加延时以及changeDir解决同时按两个键出现的bug;
        self.delaytime = setTimeout(function() {
          self.changeDir = true
        }, self.time)
      }
      this.createEgg()
    }
  }
</script>

<style scoped>
  #mainDiv {
    overflow: hidden;
    font-size: 0px;
    margin: auto;
    border: 1px solid black;
    width: 342px;
    height: 512px;
  }

  #main {
    border: 3px solid black;
    margin: auto;
    background: #282b2b;
    width: 348px;
    height: 600px;
    display: block;
  }

  .rowLine {
    width: 344px;
    height: 17px;
    overflow: hidden;
    font-size: 0px;
    margin: auto;
    border: 1px solid black;
    display: block;
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
    width: 15px;
    border: 1px solid gray;
    height: 15px;
    display: inline-block;
    font-size: 0px;
  }

  .egg {
    background: red;
    border-radius: 50%;
    border: 1px solid grey;
    width: 17px;
    height: 17px;
    display: inline-block;
  }

  .scoreDiv {
    float: right;
    width: 100px;
    height: 21px;
    color: red;
    display: block;
  }

  .title {
    text-align: center;
    font-size: 2rem;
    color: silver;
    text-shadow: 2px 2px 12px yellow;
    width: 342px;
    height: 42px;
    display: block;
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

  /**
   * #button_2 {
   *   width: 120px;
   * }
   */
</style>
