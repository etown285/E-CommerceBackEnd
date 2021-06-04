const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // console.log("Testing Category Route...");
  // res.send("Testing Category Route");
  // find all categories
  // be sure to include its associated Products
 

 try {
    const categoryData = await Category.findAll({
      // attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        // attributes: ['id','categto'],
      }],
    });
    res.status(300).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});


router.get('/:id', async (req, res) => {
  //console.log(req)
  console.log(req.params)
  console.log(req.params.id)
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const data = await Category.findOne ({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product, 
    }],
  });

    res.status(200).json(data); 
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/', async (req, res) => {
  // create a new category
  console.log(req.body)
  console.log(req.body.category_name)


  // create a temp variable (sanitize data --> or add aditional data before creation)
  let temp = {
    category_name: req.body.category_name
  }

  try {
    const data = await Category.create(req.body) 
  
    res.status(200).json(data); 
  } catch (err) {
    res.status(500).json(err);
}
});


router.put('/:id', async (req, res) => {
  console.log(req.body);
  
  // update a category by its `id` value
  let changeCategory = {
    category_name: req.body.category_name
  }
  console.log(changeCategory)
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    }) 
  
    res.status(200).json(data); 
  } catch (err) {
    res.status(500).json(err);
}

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  console.log(req.params);
  
  // update a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id
      },
    }) 
  
    res.status(200).json(data); 
  } catch (err) {
    res.status(500).json(err);
}

});

module.exports = router;
