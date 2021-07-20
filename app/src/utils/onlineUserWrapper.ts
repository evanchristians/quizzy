import { useEffect } from "react";
import { useUpdateLastSeenMutation } from "../generated/types";

const OnlineUserWrapper = ({ children }) => {
    const [updateLastSeen] = useUpdateLastSeenMutation({});

    useEffect(() => {
        const refreshOnlineUser = setInterval(
            () => updateLastSeen(),
            10 * 1000
        );
        return () => clearInterval(refreshOnlineUser);
    });

    return children;
};

export default OnlineUserWrapper;
