export const defaultState = {
  navigationState: false,
  cart:[],
  user:[],
  allCards:[]
};
export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'NAVIGATION_DECIDER':  
      return {
        ...state,
        navigationState: action.data,
      };
      case 'CART':
        // console.log("reducer =====>",action.data)
        return{
          ...state,
         cart:action.data
        }
        case 'USER_DETAILS':
        console.log("reducer =====>",action.data)
        return{
          ...state,
         user:action.data
        }
        case "CARDS":
          return{
            ...state,
            allCards:action.data
          }
  }
};

