exports.actions = {
    'test0': { 
  //  { 
      type: 'exec',
      run: 'sleep 1',
    },
  'test': {
//  {
    type: 'db',
    method: 'update',
  },
  'test2': { 
//  { 
    type: 'exec',
    run: './test.sh',
  }
}
