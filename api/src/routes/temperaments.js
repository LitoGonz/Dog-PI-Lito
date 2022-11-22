const {Router} = require('express');
const router = Router();
const fetch = require('node-fetch')
const {Temperament} = require('../db')


router.get('/temperaments', async (req,res) => {
    try {
        
        const breeds = await fetch('https://api.thedogapi.com/v1/breeds')
        const data = await breeds.json() 
        let temperaments
        let newTemperaments = []
        data.forEach(e => {
            if(e.temperament){
                temperaments = e.temperament.split(',')
                temperaments.forEach(e => {
                    if(e[0] === ' '){
                        e = e.slice(1)
                    }
                    if(!newTemperaments.includes(e)){
                        newTemperaments.push(e)
                    }
                })
            }
        });
        let filteredTemperaments = [...new Set(newTemperaments)]

        let a = filteredTemperaments.map( e => {
            return {name: e}
        })

      for (temp of a) {
        let findTemp = await Temperament.findOne({where: {name: temp.name}})
        if (findTemp) return res.json(await Temperament.findAll())
        await Temperament.create({name : temp.name})
      }
        res.status(200).json(await Temperament.findAll())
    } catch (error) {}
})



module.exports = router;