import React, { useState } from "react";
import { firestore } from "../firebase";
import "./Posts.css";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { likeStyle, notLikeStyle, notLikeStyleHover } from "../aux";
import heartSvg from "../assets/heart.svg";

function Interactions({ likes, docId, activeUser }) {
    const [toggleLiked, setToggleLiked] = useState(false);
    const [amountOfLikes, setAmountOfLikes] = useState(likes.length);
    const [hoverStatus, setHoverStatus] = useState(false);

    const handleToggleLiked = async (docId, userId) => {
        if (toggleLiked == false) {
            setToggleLiked(true);
            setAmountOfLikes(amountOfLikes + 1);
        } else {
            setToggleLiked(false);
            setAmountOfLikes(amountOfLikes - 1);
        }

        await firestore
            .collection("photos")
            .doc(docId)
            .update({
                likes: toggleLiked ? arrayRemove(userId) : arrayUnion(userId),
            });

        //send notification to user I liked this
    };

    useState(async () => {
        let didILikeThisPhoto = likes.includes(activeUser.userId)

        didILikeThisPhoto && setToggleLiked(true);
    }, []);

    return (
        <div>
            <div className="interactions">
                <div className="left">
                    <i
                        style={
                            toggleLiked
                                ? likeStyle
                                : hoverStatus
                                ? notLikeStyleHover
                                : notLikeStyle
                        }
                        className="far fa-heart interaction-icons"
                        onClick={() =>
                            handleToggleLiked(docId, activeUser.userId)
                        }
                        onMouseOver={() => setHoverStatus(true)}
                        onMouseOut={() => setHoverStatus(false)}
                    />
                    <i className="far fa-comment interaction-icons" />
                </div>
                <div className="right">
                    <i className="far fa-bookmark interaction-icons" />
                </div>
            </div>
            <div className="amount-of-likes">
                {amountOfLikes == 1 ? (
                    <p>{amountOfLikes} like</p>
                ) : (
                    <p>{amountOfLikes} likes </p>
                )}
            </div>
        </div>
    );
}

export default Interactions;
