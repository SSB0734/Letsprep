import api from "../constants";

export const ExamType = (examName) => {
    console.log(examName);
    if (examName === "mst1") {
        return "MST-1"
    }
    if (examName === "mst2") {
        return "MST-2"
    }
    if (examName === "mst3") {
        return "MST-3"
    }
    if (examName === "endsem") {
        return "End Sem"
    }
    return ""

}

export const UpdateFcmToken = (email = null) => {
    if (!email) return
    var removeFcmToken = null
    var newFcmToken = null

    if (localStorage?.getItem("OLD_LETS_PREP_DEVICE_ID") === localStorage?.getItem("LETS_PREP_DEVICE_ID")) {
        return
    }
    if (localStorage?.getItem("OLD_LETS_PREP_DEVICE_ID") || localStorage?.getItem("LETS_PREP_DEVICE_ID")) {
        if (localStorage?.getItem("OLD_LETS_PREP_DEVICE_ID") && localStorage?.getItem("LETS_PREP_DEVICE_ID")) {
            // add and remove token
            removeFcmToken = localStorage?.getItem("OLD_LETS_PREP_DEVICE_ID");
            newFcmToken = localStorage?.getItem("LETS_PREP_DEVICE_ID");
        } else if (localStorage?.getItem("LETS_PREP_DEVICE_ID")) {
            // add new token
            newFcmToken = localStorage?.getItem("LETS_PREP_DEVICE_ID");
        } else if (localStorage?.getItem("OLD_LETS_PREP_DEVICE_ID")) {
            // remove older token
            removeFcmToken = localStorage?.getItem("OLD_LETS_PREP_DEVICE_ID");
        }

        fetch(`${api}user/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fcmToken: newFcmToken,
                oldFcmToken: removeFcmToken,
                email: email
            }),
        }).then((res) => {
            if (res?.status === 200) {
                if (localStorage?.getItem("LETS_PREP_DEVICE_ID")) {
                    localStorage.setItem("OLD_LETS_PREP_DEVICE_ID", localStorage?.getItem("LETS_PREP_DEVICE_ID"));
                } else {
                    localStorage.removeItem("OLD_LETS_PREP_DEVICE_ID")
                }
            }
        }).catch((err) => {
            console.log(err);
        })

    }
}