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
    height: 400,
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid #efefef",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
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
