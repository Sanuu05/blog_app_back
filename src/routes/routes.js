const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()
const {Register,Login,loadUser, Follow, postData,Likes,Dislikes, getFollowers, getFollowing, getUser, getPost,Comment,getMyPost, updatePic, myFollowPost,unFollow, Reset, getPostByUser, allUsers} = require('../controller/controller')

router.post('/register',Register)
router.post('/login',Login)
router.get('/load',auth,loadUser)
router.put('/follow',auth,Follow)
router.put('/unfollow',auth,unFollow)
router.post('/postdata',auth,postData)
router.post('/reset',Reset)
router.get('/allusers',allUsers)
router.get('/allposts',getPost)
router.get('/userposts/:id',getPostByUser)
router.get('/myposts',auth,getMyPost)
router.put('/like',auth,Likes)
router.put('/unlike',auth,Dislikes)
router.get('/followers',getFollowers)
router.get('/following',getFollowing)
router.get('/getuser/:id',getUser)
router.put('/comment',auth,Comment)
router.get('/followposts',auth,myFollowPost)
router.patch('/updatedp',auth,updatePic)

module.exports = router