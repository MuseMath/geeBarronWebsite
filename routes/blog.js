var express = require('express');
var router = express.Router();
var models = require("../models");
var url  = require('url'),
    fs   = require('fs');

/* GET BLOG page. */
router.get('/', function(req, res) {
    var url_parts = url.parse(req.url);
    models.Posts.all().then(function(postList) {
        res.render('blog/blog');
    });
});

/**************** NEW POST ****************************************************************/

/* GET NEW page. */
router.get('/new', function(req, res) {
    var url_parts = url.parse(req.url);
    models.Posts.all().then(function(postList) {
        res.render('blog/new/new');
    });
});

/* POST NEW page. */
router.post('/new', function(req, res) {
    console.log(req.body);
    res.json({
        success: true
    });
});

/* GET UPDATE POST page. */
router.get('/update/:postId', function(req, res) {
    var url_parts = url.parse(req.url);
    models.Posts.find({
        where:{id: req.params.postId}}).then(function (updatePost) {
        res.render("new", {post: updatePost, path: url_parts.pathname});
    });
});

/* GET SINGLE POST page. */
router.get('/:postId', function(req, res) {
    models.Posts.find({
        where:{id: req.params.postId}}).then(function (singlePost) {
        res.render('show', {post: singlePost});
    });
});

/* Adding New Post. */
router.post('/add-post', function(req, res) {
    models.Posts.sync().then(function () {
        var data = {
            title: req.body.postTitle,
            content: req.body.contentArea
        };

        models.Posts.create(data).then(function(post){
            models.Posts.findAll({}).then(function (postList) {
                res.redirect('/posts/new')
            });
        });
    });
});

/* Updating SINGLE POST. */
router.put('/update-post', function(req, res) {
    models.Posts.find({
        where:{id: req.body.postId}}).then(function (post) {
        if (post)
            post.updateAttributes({
                title: req.body.postTitle,
                content: req.body.contentArea
            }).then(function (post) {
                models.Posts.findAll({}).then(function (postList) {
                    res.json(postList);
                });
            });
    });
});

/* Deleting SINGLE POST page. */
router.delete('/delete-post', function(req, res) {
    models.Posts.destroy({
        where: {
            id: req.body.postId
        }
    }).then(function(post) {
        res.json(post);
    });
});


module.exports = router;