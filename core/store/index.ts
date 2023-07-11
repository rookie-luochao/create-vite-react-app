import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { logger } from "./loggerMiddleware";

interface ILoginInfo {
  token: string;
  refreshToken?: string;
  uid?: string;
  expireAt?: string;
  expires_in?: number;
}

interface ILoginInfoState {
  loginInfo: ILoginInfo | null;
  updateLoginInfo: (nextState: ILoginInfo) => void;
  clear: () => void;
}

interface IProject {
  projectId: string;
  projectName: string;
}

interface IProjectState {
  projectInfo: IProject[] | null;
  updateProjectInfo: (nextState: IProject[]) => void;
  clear: () => void;
}

export const useLoginStore = create<ILoginInfoState>()(
  logger(
    devtools(
      persist(
        (set) => ({
          loginInfo: null,
          updateLoginInfo: (newLoginInfo) => set(() => ({ loginInfo: newLoginInfo })),
          clear: () => set(() => ({ loginInfo: null })),
        }),
        {
          name: "login-storage",
        },
      ),
    ),
  ),
);

export const useProjectStore = create<IProjectState>()(
  logger(
    devtools(
      persist(
        (set) => ({
          projectInfo: null,
          updateProjectInfo: (newProjectInfo) => set(() => ({ projectInfo: newProjectInfo })),
          clear: () => set(() => ({ projectInfo: null })),
        }),
        {
          name: "project-storage",
        },
      ),
    ),
  ),
);
