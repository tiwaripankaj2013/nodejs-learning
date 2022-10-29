const express = require('express');
const {createCommentCtrl, fetchAllComments, fetchCommentCtrl, updateCommentCtrl, delteCommentCtrl} = require('../../controllers/comments/commentCtrl');

const authMiddleware = require('../../middlewares/auth/authMiddleware');
const commentRoutes = express.Router();

commentRoutes.post('/',authMiddleware,createCommentCtrl);
commentRoutes.get('/',authMiddleware,fetchAllComments);
commentRoutes.get('/:id',authMiddleware,fetchCommentCtrl);
commentRoutes.put('/:id',authMiddleware,updateCommentCtrl);
commentRoutes.delete('/:id',authMiddleware,delteCommentCtrl);

module.exports = commentRoutes;