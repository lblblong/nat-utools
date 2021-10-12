module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨ 新功能',
    },
    {
      value: 'fix',
      name: '🐛 bug修复',
    },
    {
      value: 'refactor',
      name: '🎨 样式调整',
    },
    {
      value: 'perf',
      name: '👌 性能优化',
    },
    {
      value: 'build & ci',
      name: '📦 构建与CI修改',
    },
    {
      value: 'doc',
      name: '📖 文档更新',
    },
    {
      value: 'chore',
      name: '🙈 其他修改',
    },
  ],

  scopes: [],

  messages: {
    type: '提交类型:',
    subject: '简短说明:',
    confirmCommit: '确认提交?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['scope', 'body', 'breaking', 'footer'],
}
