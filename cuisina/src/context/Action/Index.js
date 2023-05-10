export const AppActions = dispatch => ({
    NavigationDecider: async data => {
        dispatch({ type: 'NAVIGATION_DECIDER', data });
    },
    AddToCart: async data=>{
        console.log("action  varun=====>",data)
        dispatch({type:"CART",data});
    },
    UserDetailsAction:async data=>{
     
        dispatch({type:"USER_DETAILS",data});
    },
    AddCardAction:async data=>{
        console.log("actionsatcikindxsn=>>",data)
        dispatch({type:"CARDS",data})   
    }
});