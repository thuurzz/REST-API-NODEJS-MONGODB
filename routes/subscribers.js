const express = require("express")
const router = express.Router()
const Subscriber = require("../models/subscriber")

// find all
router.get("/", async (req, res)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// find one
router.get("/:id", getSubscriber, (req, res)=>{
    res.json(res.subscriber)
})
// update complete
router.post("/", async (req, res)=>{
    const subscriber = new Subscriber({
        userName: req.body.userName,
        userChannel: req.body.userChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// update parcial
router.patch("/:id", getSubscriber, (req, res)=>{

})
// delete
router.delete("/:id", getSubscriber, async(req, res)=>{
    try {
        await res.subscriber.remove()
        res.json({message: "Subscriber was deleted"})
    } catch (error) {   
        res.status(500).json({error: error.message})
    }
})

async function getSubscriber(req, res, next){
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message: "Subscriber not founbd"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.subscriber = subscriber
    next()
}


module.exports = router