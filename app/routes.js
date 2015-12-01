
var ToDo = require('./models/todo');

module.exports = function(app) {
	app.get('/api/todos',function (req,res) {
		ToDo.find(function (err,todos) {
			console.log("in get");
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	});
	app.post('/api/todos',function (req,res) {
		ToDo.create({
			text:req.body.text,
			done:false
		},function (err,todo) {
			console.log('in post');
			if(err){
				res.send(err);
			}
			ToDo.find(function (err,todos) {
				if(err){
					res.send(err);
				}
				res.json(todos);
			});
		});
	});

	app.delete('/api/todos/:todo_id',function (req,res) {
		ToDo.remove({
			_id:req.params.todo_id
		},function (err,todo) {
			if(err){
				res.send(err);
			}
			ToDo.find(function (err,todos) {
				if(err){
					res.send(err);
				}
				res.json(todos);
			});
		});
	});
	//API END

	// APPLICATION

	app.get('*',function (req,res) {
		res.sendfile('./public/index.html');
	});
// APPLICATION END
};