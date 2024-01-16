import { useLocation } from 'react-router-dom';
const nonEmptyFilter = (filter : Object) => {
  return Object.fromEntries(
    Object.entries(filter).filter(([key, value]) => Boolean(value))
  )
};

const paramify = (params : Object) => {
  const param = new URLSearchParams(nonEmptyFilter(params)).toString();
  return param ? `?${param}` : "";
}

function useQueryParams() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return Object.fromEntries(queryParams.entries());
}

export {
  paramify,
  useQueryParams
};