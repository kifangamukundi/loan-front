'use client'
import { useState } from "react";

export function CommentForm({ createComment, updateComment, deleteComment, postId, existingComment = null, onCancel }) {
    const [formData, setFormData] = useState({
        message: existingComment ? existingComment.CommentContent : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            PostID: postId,
            CommentContent: formData.message,
            ParentCommentID: existingComment ? existingComment.ParentCommentID : null,
        };

        await createComment(newResource);
        setFormData({ message: '' });

        if (onCancel) onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg p-4 my-6">
            <div className="comment-form-row flex flex-col space-y-4">
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="message-input w-full h-28 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                    placeholder="Write your comment..."
                    required
                />
                <div className="flex space-x-3">
                    <button
                        type="submit"
                        className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        {existingComment ? 'Edit' : 'Post'}
                    </button>
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}