import { Router } from "express";
import { loginUser, registerUser ,logoutUser, refreshAccessToken , updateAccountDetails, updateUserAvatar, updateUserCoverImage, changeCurrentPassword } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }

]),
    registerUser);
// router.route("/login").post(registerUser);

router.route("/login").post(loginUser)

router.route ("/logout").post(logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)


export default router;