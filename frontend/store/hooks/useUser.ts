import { useRecoilValue } from 'recoil';
import {userAtom} from "../atoms/user.ts";

export const useUser = () => {
    const value = useRecoilValue(userAtom);
    return value;
};
