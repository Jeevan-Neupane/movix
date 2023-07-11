

// Recommendation

import React from "react";

import Crousel from "../../../Components/Crousel/Crousel";
import UseFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = UseFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Crousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;