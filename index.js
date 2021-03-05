const { redux , createStore, combineReducers, applyMiddleware} =require('redux');

const initialBooksState={
    numberOfBooks: 10
}
const initialPenState={
    numberOfPen:15
}

function buyBook(){
    return {
        type:"Buy_Book",
        payload:"my first action"
    }
}
function buyPen(){
    return {
        type:"Buy_Pen",
        payload:"my second data"
    }
}

const booksReducer=(state=initialBooksState,action)=>{
    switch(action.type){
        case "Buy_Book":return{
            ...state,
            numberOfBooks:state.numberOfBooks-1
        }
        default: return state;
    }
}

const pensReducer=(state=initialPenState,action)=>{
    switch(action.type){
        case "Buy_Pen":return{
            ...state,
            numberOfPen:state.numberOfPen-2
        }
        default: return state;
    }
}

const reducer=combineReducers({
    books: booksReducer,
    pen: pensReducer
})

const logger=store=>{
    return next=>{
        return action=>{
            const result= next(action)
            console.log("middleware logged")
            return result;
        }
    }
}

const store= createStore(reducer,applyMiddleware(logger));
console.log(store.getState());
const unsubscribe=store.subscribe(()=>{console.log("updated state",store.getState())});
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyPen());
store.dispatch(buyPen());
unsubscribe();