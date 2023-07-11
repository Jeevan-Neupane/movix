// Similar

import React from "react";

import Crousel from "../../../Components/Crousel/Crousel";
import UseFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = UseFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Crousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Similar;
