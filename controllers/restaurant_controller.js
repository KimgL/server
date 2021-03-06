var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var Food = mongoose.model('Food');
var Order = mongoose.model('Order');
var bodyParser = require('body-parser');

exports.getRestaurantData = function(req, res) {
	Food.find({restaurant_id: req.query.restaurant_id})
	.exec(function(err, foods) {
		console.log(foods.length);
			if(err) {
				console.log(err);
				res.status(404);
				res.end();
			} else {
				console.log('ok');
				var fooddata = {data: []};
				for (food in foods) {
					console.log(food);
					var data = {
						food_name: foods[food].food_name,
						food_type: foods[food].food_type,
						food_price: foods[food].food_price,
						food_description: foods[food].food_description,
						picture_url: foods[food].picture_url
					}
					fooddata.data.push(data);
				}
				res.status(200).json(fooddata);
				res.end();
			}
	});	
}

exports.receiveOrder = function(req, res) {
	var time = req.query.time;
	

	Order.find({restaurant_id: req.query.restaurant_id, order_time: req.query.time})
	.exec(function(err, Orders) {
		console.log(Orders.length);
			if(err) {
				console.log(err);
				res.status(404);
				res.end();
			} else {
				console.log('ok');
				var orderdata = {data: []};
				for (order in orders) {
					console.log(order);
					var data = {
						food_name: orders[order].food_name,
						food_type: order[order].food_type,
						food_price: orders[order].food_price,
						food_description: orders[order].food_description,
						picture_url: orders[orde].picture_url
					}
					orderdata.data.push(data);
				}
				res.status(200).json(orderdata);
				res.end();
			}
	});	
};

exports.addFood = function(req, res) {
	console.log(req.body);
	var rastaurant_id = req.body.rastaurant_id;
	var food_name = req.body.food_name;
	var food_type = req.body.food_type;
	var food_price = req.body.food_price;
	var food_description = req.body.food_description;
	var picture_url = "/static/foods/images/" + req.body.picture_url;

	var food = new Food();
		food.set('rastaurant_id', rastaurant_id);
		food.set('food_name', food_name);
		food.set('food_type', food_type);
		food.set('food_price', food_price);
		food.set('food_description', food_description);
		food.set('picture_url', picture_url);
		food.save(function(err) {
			if(err) {
				console.log(err);
				//req.session.error = 'error';
				res.status(404);
				res.end();
			} else {
				console.log("ok");
				var data = {
					rastaurant_id: rastaurant_id,
					food_name: food_name,
					food_type: food_type,
					food_price: food_price,
					food_description: food_description,
					picture_url: picture_url
				}
				res.status(200).json(data);
				res.end();
			}
		});
};

exports.deleteFood = function(req, res) {
	console.log(req.body);
	var rastaurant_id = req.body.rastaurant_id;
	var food_name = req.body.food_name;
	Food.remove({rastaurant_id: rastaurant_id, food_name: food_name}, function(err, docs) {
		if (err) {
			console.log(err);
		} else {
			console.log('delete success');
		}
	})
};