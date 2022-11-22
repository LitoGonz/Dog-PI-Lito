import axios from 'axios'

export function getAllDogs() {
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/dogs',{});
    return dispatch({
    type: 'GET_ALL_DOGS',
    payload: json.data
    })
}
} 

export function getTemperaments(){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/temperaments',{});
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data,
        });
      }  
  };


export function filterByTemperament(payload) {
    return{
        type: 'FILTER_BY_TEMPERAMENTS',
        payload
    }
};


export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function getDogName(name){
    return async function(dispatch){

        try {
            let json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: 'GET_DOG_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderByWeight(payload){
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export const filterDogByCreated = (data) => {
    return {
        type: 'FILTER_DOG_CREATED',
        payload: data
    }
}

export function showDogDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/dogs/' + id);
        return dispatch({
            type: 'SHOW_DOG_DETAILS',
            payload: json.data
        });
        } catch (error) {
            console.log(error);
        }
    }
};

export function postDog(payload){
    return async function(){
        const data = await axios.post('http://localhost:3001/dogs',payload)
        return data;
    }
}

