
const router =require('express').Router()

router.get("/", (req, res, next) => {
        const data = {
            massege:"All systems are up and running"
        }
        return res.status(200).json(data)
})

module.exports = router