import { useParams } from 'react-router-dom';

interface ParamsType {
  [key: string]: string;
}

const useParamsInt = (key = 'id'): number => {
  const params = useParams<ParamsType>();

  return params[key] ? parseInt(params[key]) : 0;
};

export default useParamsInt;
