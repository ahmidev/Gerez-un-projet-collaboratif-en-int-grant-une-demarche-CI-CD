name: Backend CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  backend:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 

      - name: Set up JDK 11
        uses: actions/setup-java@v4
        with:
          java-version: '11'
          distribution: 'temurin'

      - name: Cache Maven packages
        uses: actions/cache@v4
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
          restore-keys: ${{ runner.os }}-m2

      - name: Build with Maven
        run: mvn clean install
        working-directory: ./back

      - name: Run tests and generate coverage report
        run: mvn test jacoco:report
        working-directory: ./back

      - name: Upload coverage report
        uses: actions/upload-artifact@v3
        with:
          name: backend-coverage
          path: back/target/site/jacoco

      # Set up JDK 17 specifically for SonarCloud scan
      - name: Set up JDK 17 for SonarCloud
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: SonarCloud Scan
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        run: |

          mvn -B verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar -Dsonar.projectKey=ahmidev_Gerez-un-projet-collaboratif-en-int-grant-une-demarche-CI-CD
        working-directory: ./back


      - name: Build Docker image
        uses: docker/build-push-action@v3
        with:
          context: ./back
          push: false
          tags: ahmid44/bobapp-backend:latest
