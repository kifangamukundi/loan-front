'use client'
import { useContext } from "react";
import { usePathname, useRouter } from 'next/navigation';

import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";

import { useComment } from "kifanga-ui-hooks";
import { AuthContext } from 'kifanga-ui-state';
import { IconRight } from "kifanga-ui-icons";

export const CommentSection = ({ url, postId }) => {
    const { 
        createCommentData, 
        createComment, 
        fetchCommentsData, 
        updateCommentData,
        updateComment,
        deleteCommentData,
        deleteComment,
        likeCommentData,
        likeComment,
     } = useComment(url, postId);

    const authContext = useContext(AuthContext);
    const { userInfo } = authContext;

    const isLoggedIn = !!userInfo?.user?.accessToken;

    const router = useRouter();
    const pathname = usePathname();

    const handleLoginRedirect = async () => {
        localStorage.setItem('intendedDestination', pathname);
        router.push('/login');
    };

    return (
        <div className="prose prose-xl max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {isLoggedIn ? (
                <CommentForm createComment={createComment} postId={postId} />
            ) : (
                <div className="login-to-comment">
                <p className="text-gray-700">Please log in to leave a comment.</p>
                <button
                    onClick={handleLoginRedirect}
                    className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Login <IconRight className="h-5 w-5 ml-2" />
                </button>
                </div>
            )}
            <CommentList 
                comments={fetchCommentsData.data} 
                createComment={createComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                likeComment={likeComment}
                postId={postId} 
            />
        </div>
    );
};