import {atom} from 'recoil';

export interface User {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  imageURL?: string;
  userID?: number | string;
  email?: string;
  name?: string;
  loginType?: string;
}

const user = {
  firstName: '',
  middleName: '',
  imageURL: '',
  userID: 0,
  email: '',
  name: '',
  loginType: '',
};

export const AccountAtom = atom<User>({
  key: 'account',
  default: user,
});
