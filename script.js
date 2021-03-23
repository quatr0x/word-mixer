const App = {
  data() {
    return {
      blocks: [`машина\nхлеб\nтелефон`, `купить\nнайти\nцена`],
      result: '',
      mixButtonActive: true
    }
  },
  methods: {
    mix() {
      this.mixButtonActive = false
      this.result = ''
      setTimeout(() => {
        const json = JSON.stringify(this.blocks)
        sessionStorage.setItem('blocks', json)
        this.result = this.processBlock(this.blocks.filter(i => i), 0).join(`\n`)
        this.mixButtonActive = true
      }, 100)
    },
    processBlock(blocks, blockIndex) {
      let result = []

      const block = blocks[blockIndex]
      const words = block.split('\n').filter(i => i).map(s => s.trim())

      if (blocks.length - 1 > blockIndex) {
        for (const word of words) {
          const nextBlockResult = this.processBlock(blocks, blockIndex + 1)
          for (const nextBlockResultItem of nextBlockResult) {
            result.push(word + ' ' + nextBlockResultItem)
          }
        }
      } else {
        result = words
      }

      return result
    },
    deleteBlock(block) {
      const index = this.blocks.indexOf(block)
      if (index > -1) {
        this.blocks.splice(index, 1)
      }
    },
    addBlock() {
      this.blocks.push('')
    }
  },
  mounted() {
      const blocksJson = sessionStorage.getItem('blocks')
      if (blocksJson !== null) {
        this.blocks = JSON.parse(blocksJson)
      }
  }
}

Vue.createApp(App).mount('#app')
