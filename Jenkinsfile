pipeline {
    agent any

    triggers {
        cron('H/120 * * * *')
    }

    tools {
        nodejs 'NodeJS-18'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Omkar-dalvi-qa/Dubai-Opera-TestCases.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test --reporter=line'
            }
        }

    }

    post {
        always {
            echo 'Tests finished!'
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Some tests failed — check the logs.'
        }
    }
}