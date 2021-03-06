module.exports = {
  types: [
    {
      value: 'feat',
      name: 'â¨ æ°åè½',
    },
    {
      value: 'fix',
      name: 'ð bugä¿®å¤',
    },
    {
      value: 'refactor',
      name: 'ð¨ æ ·å¼è°æ´',
    },
    {
      value: 'perf',
      name: 'ð æ§è½ä¼å',
    },
    {
      value: 'build & ci',
      name: 'ð¦ æå»ºä¸CIä¿®æ¹',
    },
    {
      value: 'doc',
      name: 'ð ææ¡£æ´æ°',
    },
    {
      value: 'chore',
      name: 'ð å¶ä»ä¿®æ¹',
    },
  ],

  scopes: [],

  messages: {
    type: 'æäº¤ç±»å:',
    subject: 'ç®ç­è¯´æ:',
    confirmCommit: 'ç¡®è®¤æäº¤?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['scope', 'body', 'breaking', 'footer'],
}
