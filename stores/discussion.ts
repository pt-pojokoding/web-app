// @ts-nocheck
import {
    collection,
    getDocs,
    orderBy,
    query,
    startAfter,
    where,
    limit,
    addDoc,
    updateDoc,
} from "@firebase/firestore";

export const useDiscussionStore = defineStore("discussion", () => {
    const { $db } = useNuxtApp();
    const authStore = useAuthStore();

    async function createComment(newComment: { contentId: string; comment: string }) {
        const commentData = {
            contentId: newComment.contentId,
            userId: authStore.user.uid,
            content: newComment.comment,
            createdAt: new Date(),
            updatedAt: new Date(),
            upvote: 0,
            upvotedUsers: [],
        };

        const commentRef = await addDoc(collection($db, "comments"), commentData);

        console.log("New Comment:", commentRef);
    }

    async function readAllComment(contentId: string, startAfterCursor = null) {
        const commentsRef = collection($db, "comments");
        let q = query(
            commentsRef,
            where("contentId", "==", contentId),
            orderBy("upvote", "desc"),
            limit(5)
        );

        if (startAfterCursor) {
            q = query(
                commentsRef,
                where("contentId", "==", contentId),
                orderBy("upvote", "desc"),
                startAfter(startAfterCursor),
                limit(5)
            );
        }

        const querySnapshot = await getDocs(q);

        const comments: any[] = [];

        querySnapshot.forEach((doc) => {
            comments.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        const cursor = querySnapshot.docs[querySnapshot.docs.length - 1];
        return { comments, cursor };
    }

    async function updateComment(commentId: string, newComment: string) {
        const commentRef = doc($db, "comments", commentId);

        await updateDoc(commentRef, {
            content: newComment,
            updatedAt: new Date(),
        });
    }

    // upvote a Comment or Reply
    async function upvote(commentOrReplyId: string, type: "comment" | "reply") {
        const collectionName = type === "comment" ? "comments" : "replies";
        const commentOrReplyRef = doc($db, collectionName, commentOrReplyId);

        const commentOrReplySnapshot = await getDoc(commentOrReplyRef);
        const commentOrReplyData = commentOrReplySnapshot.data();
        console.log(`${type} Data`, commentOrReplyData);

        if (commentOrReplyData?.upvotedUsers.includes(userId)) {
            // * The user has already upvoted this comment/reply. Remove the upvote.
            await updateDoc(commentOrReplyRef, {
                upvote: increment(-1),
                upvotedUsers: arrayRemove(userId),
            });
        } else {
            // * The user hasn't upvoted this comment/reply. Add the upvote.
            await updateDoc(commentOrReplyRef, {
                upvote: increment(1),
                upvotedUsers: arrayUnion(userId),
            });
        }
    }

    async function deleteComment(commentId: string) {
        const commentRef = doc($db, "comments", commentId);
        await deleteDoc(commentRef);
    }

    async function createReply(replyData: { commentId: string; reply: string }) {
        const newReply = {
            commentId: replyData.commentId,
            userId: authStore.user.uid,
            content: replyData.reply,
            createdAt: new Date(),
            updatedAt: new Date(),
            upvote: 0,
            upvotedUsers: [],
        };

        const replyRef = await addDoc(collection($db, "replies"), newReply);
    }

    async function readAllReplyInOneComment(commentId: string) {
        const replyRef = collection($db, "replies");
        const q = query(replyRef, where("commentId", "==", commentId));

        const querySnapshot = await getDocs(q);

        const replies: any[] = [];

        querySnapshot.forEach((doc) => {
            replies.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        // sort array of object by createdAt ASC
        const sortedReplies = replies.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });
    }

    async function updateReply(replyId: string, updateReplyContent: string) {
        const replyRef = doc($db, "replies", replyId);

        await updateDoc(replyRef, {
            content: updateReplyContent,
            updatedAt: new Date(),
        });
    }

    async function deleteReply(replyId: string){
        const replyRef = doc($db, "replies", replyId);
        await deleteDoc(replyRef)
    }

    return {
        createComment,
        readAllComment,
        updateComment,
        deleteComment,
        createReply,
        readAllReplyInOneComment,
        updateReply,
        deleteReply,
        upvote,
    };
});
