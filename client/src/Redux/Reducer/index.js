import axios from "axios";

const initialState = {
    dogs : [],
    temperaments: [],
    allDogs:[],
    details:[]
};

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            };

        case 'FILTER_BY_TEMPERAMENTS':
            const allDogs = state.allDogs;
            let filteredDogs = [];
            if (action.payload === 'Todos') {
                filteredDogs = allDogs;
            } else {
                for (let i = 0; i < allDogs.length; i++) {
                    let dogFound = allDogs[i].temperament?.find(e => e === action.payload);
                    if (dogFound) {
                        filteredDogs.push(allDogs[i]);
                    }
                }
            }
            return {
                ...state,
                dogs: filteredDogs,
            };
        
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === "asc" ? state.dogs.sort(function(a,b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0; 
            }):
            state.dogs.sort(function(a,b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0; 
            })
            return {
                ...state,
                dogs: sortedArr
            };
        
        case 'GET_DOG_NAME':
            return{
                ...state,
                dogs: action.payload
            }

            case "ORDER_BY_WEIGHT":
                const orderedWeight =
                  action.payload === 'min_weight'
                    ? state.dogs.sort((a, b) => {
                        if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                          return 1;
                        }
                        if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                          return -1;
                        }
                        return 0;
                      })
                    : state.dogs.sort((a, b) => {
                        if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                          return -1;
                        }
                        if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                          return 1;
                        }
                        return 0;
                      });
                return {
                  ...state,
                  dogs: orderedWeight
                };

        case 'FILTER_DOG_CREATED':
            const allDog = state.allDogs
            const filteredDog = action.payload === 'created' ? allDog.filter(e => e.createdInDb) : allDog.filter(e => !e.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'all' ? state.allDogs : filteredDog
            }
        
        case 'SHOW_DOG_DETAILS':
            return {
                ...state,
                details: action.payload
            }  
            
        default: 
            return state;
    }
}

export default rootReducer;