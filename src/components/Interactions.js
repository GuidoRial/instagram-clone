import React, { useState } from "react";
import { firestore } from "../firebase";
import "./Posts.css";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { likeStyle, notLikeStyle, notLikeStyleHover } from "../aux";

function Interactions({ likes, docId, activeUser, saved }) {
    const [toggleLiked, setToggleLiked] = useState(false);
    const [amountOfLikes, setAmountOfLikes] = useState(likes.length);
    const [hoverStatus, setHoverStatus] = useState(false);

    const [toggleSaved, setToggleSaved] = useState(false);

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

    const handleToggleSaved = async (docId, userId) => {
        if (toggleSaved == false) {
            setToggleSaved(true);
        } else {
            setToggleSaved(false);
        }

        await firestore
            .collection("photos")
            .doc(docId)
            .update({
                saved: toggleSaved ? arrayRemove(userId) : arrayUnion(userId),
            });

        //send notification to user I liked this
    };

    useState(async () => {
        let didILikeThisPhoto = likes.includes(activeUser.userId);
        let didISaveThisPhoto = saved.includes(activeUser.userId);

        didILikeThisPhoto && setToggleLiked(true);
        didISaveThisPhoto && setToggleSaved(true);
    }, []);

    return (
        <div>
            <div className="interactions">
                <div className="left">
                    {toggleLiked ? (
                        <i
                            className="fas fa-heart interaction-icons"
                            onClick={() =>
                                handleToggleLiked(docId, activeUser.userId)
                            }
                            style={likeStyle}
                        />
                    ) : (
                        <i
                            style={
                                hoverStatus ? notLikeStyleHover : notLikeStyle
                            }
                            onMouseOver={() => setHoverStatus(true)}
                            onMouseOut={() => setHoverStatus(false)}
                            className="far fa-heart interaction-icons"
                            onClick={() =>
                                handleToggleLiked(docId, activeUser.userId)
                            }
                        />
                    )}

                    <i className="far fa-comment interaction-icons" />
                </div>
                <div className="right">
                    {toggleSaved ? (
                        <i
                            className="fas fa-bookmark interaction-icons"
                            onClick={() =>
                                handleToggleSaved(docId, activeUser.userId)
                            }
                        />
                    ) : (
                        <i
                            className="far fa-bookmark interaction-icons"
                            onClick={() =>
                                handleToggleSaved(docId, activeUser.userId)
                            }
                        />
                    )}
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
