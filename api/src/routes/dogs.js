const {Router} = require('express');
const router = Router();
const fetch = require('node-fetch')
const {Breed, Temperament, breed_temperaments} = require('../db')

const dogFormat = (array) => {
    return array.map((e) => {
        return {
            id: e.id,
            image: e.image,
            name: e.name,
            temperament: e.temperament || e.temperaments?.map(e => e.name),
            weight: e.weight.imperial || e.weight,
            height: e.height.imperial || e.height,
            life_span: e.life_span,
            createdInDb: e.createdInDb
        }
    })
}

const getApiData = async () => {
    
    const breeds = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await breeds.json() 
    
    data.sort( () => {
        return Math.random()-0.5
    })

    let dogData = [];

    for (let i = 0; i < data.length; i++) {
        
        dogData.push({
        id : data[i].id,
        name: data[i].name,
        height: data[i].height.imperial?.split('-').map(e => e.trim()),
        weight: data[i].weight.imperial?.split('-').map(e => e.trim()),
        life_span: data[i].life_span,
        temperament: data[i].temperament?.split(',').flat().map(e => e.trim()),
        image: data[i].image.url 
        })}

    return dogData;
}

const getDbData = async () => {
    return await Breed.findAll({
      include: {
          model: Temperament,
          attributes: ['name'],
          through: {
              attributes: []
          }
      }
    })
  }

const getTotalData = async () => {
    const apiData = await getApiData();
    const dbInfo = await getDbData();
    const totalData = [...apiData, ...dbInfo];
    return totalData;
}





router.get('/dogs', async (req,res) => {
const {name} = req.query;

try {
    
    const allDogs = await getTotalData();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        let aux = dogFormat(dog);
        res.status(200).json(aux)
    }  else {
        const dogData = await getTotalData()
        let aux2 = dogFormat(dogData)
        res.status(200).json(aux2) 
    }
}

catch (error) {
    res.status(404).send('Error getting the Data')
}

})

//GET /dogs/{idRaza}

router.get('/dogs/:id', async (req,res) => {
    const {id} = req.params;
    let breeds = await getTotalData();

try {
    const filterDogs = breeds.filter(e => e.id == id)

    if(filterDogs.length){
        res.status(200).json(filterDogs)
    } else {
        res.status(404).send('No dog found on that ID')
    }

} catch (error) {
    console.log(error)
}
})

//POST /dogs

router.post('/dogs', async (req,res) => {
    let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image
       } = req.body
    
       const fixedHeight = []
       const minHeight = min_height;
       const maxHeight = max_height;
       fixedHeight.push(minHeight, maxHeight)
    
       const fixedWeight = []
       const minWeight = min_weight;
       const maxWeight = max_weight;
       fixedWeight.push(minWeight, maxWeight)
    
       let dog = await Breed.create({
        name,
        height: fixedHeight,
        weight: fixedWeight,
        life_span,
        image: image ? image : 'https://www.infobae.com/new-resizer/Bcx3DWwspJAhUKsx1JccMAeZpZQ=/1200x900/filters:format(webp):quality(85)//s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/07/05182149/dogecoin-1.jpg',
       })
    
       let associatedTemp = await Temperament.findAll({
           where: { name: temperaments},
       })
    
       dog.addTemperament(associatedTemp);
    
       res.status(200).send("Dog created succesfully!")
})

module.exports = router;
