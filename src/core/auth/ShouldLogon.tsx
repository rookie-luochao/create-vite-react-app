import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { ILoginInfoStorageState, loginInfoStorageKey } from '../store';

export default function ShouldLogon({ children }: { children: ReactNode }) {
  const loginInfoStorageStr =
    globalThis.localStorage.getItem(loginInfoStorageKey);

  if (!loginInfoStorageStr) {
    return <Navigate to="/login" />;
  }

  const loginInfo = (JSON.parse(loginInfoStorageStr) as ILoginInfoStorageState)
    .state.loginInfo;

  if (
    !loginInfo ||
    !loginInfo.expireAt ||
    dayjs().isAfter(dayjs(loginInfo.expireAt))
  ) {
    return <Navigate to="/login" />;
  }

  return children;
}
