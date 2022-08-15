export default function useQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return (key)=>urlParams.get(key)
}