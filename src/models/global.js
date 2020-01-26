export default {
    namespace: 'global',
  
    state: {
      isMobile: false,
      auth: {
            guest: true,
            user: null
      }
    },
    reducers: {
        setIsMobile(state, {payload}) {
          console.log('Setting global is mobile', payload)
          return {...state, isMobile: payload};
        },
    }
}