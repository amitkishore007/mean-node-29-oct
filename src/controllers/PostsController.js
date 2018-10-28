const Post = require('../models/Post');
module.exports = { 

    getAllPosts(req, res, next) {

        const pageSize = +req.query.pagesize;
        const currPage = +req.query.page;
        let query = Post.find({});
        if (pageSize && currPage) {
             query.skip(pageSize * (currPage-1)).limit(pageSize);   
        }
        query.then((posts)=>{
            return res.status(200).json({status:'success', data:posts});
        })
        .catch((errors)=>{
            return res.status(500).json({ status: 'success', errors: errors});
        });
    },
    createPost(req, res, next) {
        const url = req.protocol+'://'+req.get('host');
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imagepath: url+'/uploads/'+req.file.filename
        });
        post.save()
            .then((post)=>{
                return res.status(201).json({status:'success', data: post});
            })
            .catch(()=>{
                return res.status(500).json({status:'failed', errors:{error:'could not create post'}});
            });
    },
    deletePost(req, res, next) {
        const postId = req.params.id;

        Post.findOneAndDelete({_id:postId})
            .then((post)=>{
                return res.status(200).json({status:'success', data:{id:post._id}});
            })
            .catch(()=>{
                return res.status(200).json({status:'failed', errors:{error:'Could not delete post'}});
            });
    },
    getOnePost(req, res, next) {
        const postId = req.params.id;
        Post.findOne({_id:postId})
            .then((post)=>{
               return res.status(200).json({status:'success', data:post});
            })
            .catch(()=>{
                return res.status(500).json({status:'failed', errors:{error:'could not fetch post'}});
            });
    },
    updatePost(req, res, next) {
        const postId = req.params.id;
        const post = {
            title: req.body.title,
            content: req.body.content
        };

        Post.findOneAndUpdate({_id:postId}, post)
            .then((post)=>{
                return res.status(200).json({status:'success', data:post});
            })
            .catch(()=>{
                return res.status(500).json({status:'failed', errors:{error:'could not update post'}});
            });

    }


};