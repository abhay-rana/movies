
export function getQueryParams() {
    let query_params = {};

    if (!!window.location.search) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        query_params = Object.fromEntries(urlSearchParams.entries());
    }
    return query_params;
}
