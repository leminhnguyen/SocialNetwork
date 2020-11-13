const router = require('express').Router();
const Post = require('../models/Post');
const verify = require('../utils/verifyToken');

router.post('/like', verify, async (req, res) => {
    try {
        const post = await Post.findById(req.body.id);
        if(!post) {
            return res.status(404).send({
                code: 9992,
                message: "Post is not existed"
            });
        }

        if(post.likedUser) {
            if(post.likedUser.includes(req.user.id)) {
                const index = post.likedUser.indexOf(req.user.id);
                post.likedUser.splice(index, 1);
            } else {
                post.likedUser.push(req.user.id);
            }
        } else {
            post.likedUser = [req.user.id];
        }

        const updatedPost = await post.save();

        res.status(200).send({
            code: 1000,
            message: "OK",
            data: {
                like: updatedPost.likedUser.length
            }

        });

    } catch (err) {
        console.log(err);
        res.status(400).send({
            code: 1001,
            message: "Can not connect to DB"
        });
    }

});

module.exports = router;