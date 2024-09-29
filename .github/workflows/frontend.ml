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
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        working-directory: ./front
        run: npm install

      - name: Run tests
        run: npm test -- --watch=false --code-coverage
        working-directory: ./front

      - name: Upload coverage report
        uses: actions/upload-artifact@v3
        with:
          name: frontend-coverage
          path: front/coverage

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v1.5
        with:
          projectBaseDir: ./front
          args: >
           -Dsonar.projectKey=ahmidev_Gerez-un-projet-collaboratif-en-int-grant-une-demarche-CI-CD-frontend
           -Dsonar.organization=ahmidev
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          working-directory: ./front


      - name: Build Docker image
        uses: docker/build-push-action@v3
        with:
          context: ./front
          push: false
          tags: ahmid44/bobapp-frontend:latest
