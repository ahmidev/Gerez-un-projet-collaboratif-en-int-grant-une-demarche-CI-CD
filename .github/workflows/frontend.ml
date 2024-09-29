name: Frontend CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  frontend:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        
      - name: Set up Node.js 
        uses: actions/setup-node@v4
        with:
          node-version: 16
          
      - name: Install dependencies
        working-directory: front
        run: yarn install

      - name: Run tests
        working-directory: front
        run: npm run test -- --watch=false --browsers=ChromeHeadless

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        with:
          projectBaseDir: front
          args: >
            -Dsonar.projectKey=ahmidev_Gerez-un-projet-collaboratif-en-int-grant-une-demarche-CI-CD
            -Dsonar.organization=ahmidev
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

