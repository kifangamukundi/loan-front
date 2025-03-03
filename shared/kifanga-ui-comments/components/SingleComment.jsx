'use client';
import { useState, useContext } from "react";
import { jwtDecode } from 'jwt-decode';
import { CommentForm } from "./CommentForm";
import { AuthContext } from 'kifanga-ui-state';

export const SingleComment = ({ comment, createComment, postId, updateComment, deleteComment, likeComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const authContext = useContext(AuthContext);
  const { userInfo } = authContext;

  const decodedUser = userInfo ? jwtDecode(userInfo.user.accessToken) : null;
  const isLoggedIn = !!userInfo?.user?.accessToken;
  const isCommentOwner = isLoggedIn && decodedUser?.sub === comment.User.ID;

  const handleEditClick = () => {
    setIsEditing(true);
    setIsReplying(false);
  };

  const handleReplyClick = () => {
    setIsReplying(true);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsReplying(false);
  };

  const handleDeleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(comment.ID);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleToggleLike = async () => {
    try {
      await likeComment(comment.ID);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-lg">
      <p className="font-medium text-gray-700">{comment.CommentContent}</p>

      <div className="flex space-x-4 mt-2 text-sm">
        {isLoggedIn && (
          <>
            {isCommentOwner && (
              <button
                onClick={handleEditClick}
                className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Edit
              </button>
            )}
            <button
              onClick={handleReplyClick}
              className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Reply
            </button>
            {isCommentOwner && (
              <button
                onClick={handleDeleteComment}
                className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Delete
              </button>
            )}
          </>
        )}
      </div>

      {isEditing && (
        <CommentForm
          createComment={async (updateResource) => {
            // await updateComment({ ...updateResource, commentId: comment.ID });
            await updateComment(comment.ID, updateResource);
          }}
          postId={postId}
          existingComment={comment}
          onCancel={handleCancel}
        />
      )}

      {isReplying && (
        <CommentForm
          createComment={async (newResource) => {
            await createComment({ ...newResource, ParentCommentID: comment.ID });
          }}
          postId={postId}
          onCancel={handleCancel}
        />
      )}

      {comment.SubComments && comment.SubComments.length > 0 && (
        <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-4">
          {comment.SubComments.map((reply) => (
            <SingleComment
              key={reply.ID}
              comment={reply}
              createComment={createComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  );
};