'use client'
import { SingleComment } from './SingleComment'

export const CommentList = ({ comments, createComment, postId, updateComment, deleteComment, likeComment }) => {
    return (
        <div className="comment-list my-8">
            {comments.item && comments.item.length > 0 ? (
                comments.item.map((comment) => (
                    <SingleComment
                        key={comment.ID}
                        comment={comment}
                        createComment={createComment}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                        likeComment={likeComment}
                        postId={postId}
                    />
                ))
            ) : (
                <p className="text-center text-gray-500 text-lg font-medium mt-4">
                    No comments yet.
                </p>
            )}
        </div>
    );
};
