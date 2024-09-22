/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthCompleteImport } from './routes/auth.complete'
import { Route as AuthPotlucksImport } from './routes/_auth.potlucks'
import { Route as AuthPeopleImport } from './routes/_auth.people'
import { Route as AuthDashboardImport } from './routes/_auth.dashboard'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthCompleteRoute = AuthCompleteImport.update({
  path: '/auth/complete',
  getParentRoute: () => rootRoute,
} as any)

const AuthPotlucksRoute = AuthPotlucksImport.update({
  path: '/potlucks',
  getParentRoute: () => AuthRoute,
} as any)

const AuthPeopleRoute = AuthPeopleImport.update({
  path: '/people',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardRoute = AuthDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/dashboard': {
      id: '/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthDashboardImport
      parentRoute: typeof AuthImport
    }
    '/_auth/people': {
      id: '/_auth/people'
      path: '/people'
      fullPath: '/people'
      preLoaderRoute: typeof AuthPeopleImport
      parentRoute: typeof AuthImport
    }
    '/_auth/potlucks': {
      id: '/_auth/potlucks'
      path: '/potlucks'
      fullPath: '/potlucks'
      preLoaderRoute: typeof AuthPotlucksImport
      parentRoute: typeof AuthImport
    }
    '/auth/complete': {
      id: '/auth/complete'
      path: '/auth/complete'
      fullPath: '/auth/complete'
      preLoaderRoute: typeof AuthCompleteImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthDashboardRoute: typeof AuthDashboardRoute
  AuthPeopleRoute: typeof AuthPeopleRoute
  AuthPotlucksRoute: typeof AuthPotlucksRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthDashboardRoute: AuthDashboardRoute,
  AuthPeopleRoute: AuthPeopleRoute,
  AuthPotlucksRoute: AuthPotlucksRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/dashboard': typeof AuthDashboardRoute
  '/people': typeof AuthPeopleRoute
  '/potlucks': typeof AuthPotlucksRoute
  '/auth/complete': typeof AuthCompleteRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/dashboard': typeof AuthDashboardRoute
  '/people': typeof AuthPeopleRoute
  '/potlucks': typeof AuthPotlucksRoute
  '/auth/complete': typeof AuthCompleteRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/_auth/dashboard': typeof AuthDashboardRoute
  '/_auth/people': typeof AuthPeopleRoute
  '/_auth/potlucks': typeof AuthPotlucksRoute
  '/auth/complete': typeof AuthCompleteRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/dashboard'
    | '/people'
    | '/potlucks'
    | '/auth/complete'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/dashboard'
    | '/people'
    | '/potlucks'
    | '/auth/complete'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/login'
    | '/_auth/dashboard'
    | '/_auth/people'
    | '/_auth/potlucks'
    | '/auth/complete'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
  AuthCompleteRoute: typeof AuthCompleteRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
  AuthCompleteRoute: AuthCompleteRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/_auth",
        "/login",
        "/auth/complete"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/_auth": {
      "filePath": "_auth.jsx",
      "children": [
        "/_auth/dashboard",
        "/_auth/people",
        "/_auth/potlucks"
      ]
    },
    "/login": {
      "filePath": "login.jsx"
    },
    "/_auth/dashboard": {
      "filePath": "_auth.dashboard.jsx",
      "parent": "/_auth"
    },
    "/_auth/people": {
      "filePath": "_auth.people.jsx",
      "parent": "/_auth"
    },
    "/_auth/potlucks": {
      "filePath": "_auth.potlucks.jsx",
      "parent": "/_auth"
    },
    "/auth/complete": {
      "filePath": "auth.complete.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
