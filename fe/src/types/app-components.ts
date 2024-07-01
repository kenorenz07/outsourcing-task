import { NextComponentType, NextPage, NextPageContext } from 'next';
import { AppProps } from 'next/app';

/**
 * This interface is for _app.tsx
 */
export interface AppPropsType extends AppProps {
  Component: NextComponentType<NextPageContext> & {
    auth: AuthType;
  };
}

/**
 * A component with auth props
 */
export type ParentComponentAuthType = NextComponentType<NextPageContext> & {
  auth: AuthType;
};

export interface AuthType {
  required: boolean;
  roles?: Array<string>;
}

/**
 * This type is for NextPages
 */
export type PagePropsType = NextPage & { auth?: AuthType };
