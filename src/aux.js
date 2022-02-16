/* eslint-disable no-undef */
import { firestore } from "./firebase";

export const openTerms = () => {
    window.open("https://help.instagram.com/581066165581870", "_blank");
};

export const openData = () => {
    window.open("https://help.instagram.com/519522125107875", "_blank");
};

export const openCookies = () => {
    window.open("https://help.instagram.com/1896641480634370?ref=ig", "_blank");
};

export const openAppStore = () => {
    window.open(
        "https://apps.apple.com/app/instagram/id389801252?vt=lo",
        "_blank"
    );
};

export const openPlayStore = () => {
    window.open(
        "https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D58B27AC7-5FA4-45AE-95A5-339EE8663F37%26utm_content%3Dlo%26utm_medium%3Dbadge",
        "_blank"
    );
};

export const linkStyle = {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
};

export const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 200,
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #efefef",
    borderRadius: "4px",
    boxShadow: 24,
    padding: "5px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
};

export const editProfileModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 400,
    width: 800,
    bgcolor: "background.paper",
    border: "1px solid #efefef",
    borderRadius: "4px",
    boxShadow: 24,
    padding: "5px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
};

export const likeStyle = { color: "#ed4956" };

export const notLikeStyle = {
    color: "#262626",
};
export const notLikeStyleHover = {
    color: "#999999",
};
export const clearAllInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
    );
};

export const profilePhotosStyleOnHover = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "430px",
    height: "431px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    background: "black",
    opacity: "0.5",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
};

export const profilePhotosStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "430px",
    height: "431px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    opacity: "0",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
};

export const modalPostStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "95%",
    width: "65%",
    bgcolor: "background.paper",
    border: "1px solid #efefef",
    borderRadius: "4px",
    boxShadow: 24,
    padding: "5px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
};

export async function getUserByUserId(userId) {
    const result = await firestore
        .collection("users")
        .where("userId", "==", userId)
        .get();
    const [user] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));

    return user;
}

export async function getUserByUserName(username) {
    const result = await firestore
        .collection("users")
        .where("username", "==", username)
        .get();
    const [user] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));

    return user;
}

export const getFeedPhotos = async (following) => {
    const result = await firestore
        .collection("photos")
        .orderBy("dateCreated", "desc")
        .get();
    let filteredResult = result.docs
        .map((photo) => ({
            ...photo.data(),
            docId: photo.id,
        }))
        .filter((photo) => following.includes(photo.userId));

    return filteredResult;
};

export const getProfilePhotos = async (profileOwnerUserId) => {
    const result = await firestore
        .collection("photos")
        .orderBy("dateCreated", "desc")
        .get();

    let filteredResult = result.docs
        .map((photo) => ({
            ...photo.data(),
            docId: photo.id,
        }))
        .filter((photo) => profileOwnerUserId === photo.userId);

    return filteredResult;
};

export const getSavedPhotos = async (profileOwnerUserId) => {
    const result = await firestore
        .collection("photos")
        .orderBy("dateCreated", "desc")
        .get();

    let filteredResult = result.docs
        .map((photo) => ({
            ...photo.data(),
            docId: photo.id,
        }))
        .filter((photo) => photo.saved.includes(profileOwnerUserId));

    return filteredResult;
};

export async function getSuggestedProfiles(userId, following) {
    const result = await firestore.collection("users").limit(5).get();
    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter(
            (profile) =>
                profile.userId !== userId && !following.includes(profile.userId)
        );
}
