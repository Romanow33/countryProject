const { Op } = require("sequelize");
const { Router } = require("express");
const router = Router();

const { Country, Activity } = require("../db");

router.get("/", async (req, res) => {
let countries;
let { name, page } = req.query; // tendría que llegar un id de paginación del front,

try {
    if (name) {
    countries = await Country.findAll({
        where: {
        name: {
            [Op.iLike]: `%${name}%`,
        },
        },
    });

    return res.status(200).json(countries);
    } else {
    countries = await Country.findAndCountAll({
        offset: page * 10,
        limit: 10,
    });
    return res
        .status(200)
        .json({
        content: countries.rows,
        totalPages: Math.ceil(countries.count / 10),
        });
    }
} catch (err) {
    res.status(500).json({ messaje: err });
}
});

router.get("/all", async (req, res) => {
const country = await Country.findAll({ include: [Activity] });
return res.status(200).json(country);
});

router.get("/:id", async (req, res) => {
try {
    const country = await Country.findOne({
    where: {
        id: req.params.id,
    },
    include: [Activity],
    });
    return res.status(200).json(country);
} catch (err) {
    res.status(500).json({ messaje: err });
}
});

module.exports = router;
