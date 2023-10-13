# PatternFly Elements, PatternFly React, RHDS Elements and Customer Portal Elements all together

The purpose of this demo is to use a Red Hat API to fetch security data and demonstrate how combining our 
different components can deliver an entire experience.

## Components used
### PatternFly Elements with React wrappers

- Accordion, AccordionHeader, AccordionPanel
- Popover
- Button
- Timestamp
- Spinner

### PatternFly React

- Table, Thead, Tbody, Th, Tr, Td

### RHDS Elements

- rh-alert
- rh-card
- rh-badge

### Customer Portal Elements

- cp-404

## Getting started

```
yarn start
```

This should start a server on `http://localhost:5173`. 

**Note**
For the API call to work, you'll need to make sure you an entry in your `/etc/hosts` file that looks like this
```
127.0.0.1 dev.foo.redhat.com qa.foo.redhat.com stage.foo.redhat.com prod.foo.redhat.com
```

The API call needs to be executed from a *.redhat.com domain.

If everything is set up correctly, you should be able to visit `http://prod.foo.redhat.com:5173` to see the application running.

## Creating a build and previewing it

```
yarn build
yarn preview
```

Once again, for the application to work, you'll need to make sure your `/etc/hosts` file is correct. Visit `http://prod.foo.redhat.com:4173` to view the application.

------------------------------

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
