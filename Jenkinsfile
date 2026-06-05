pipeline {
    agent any

    triggers {
        cron('0 */2 * * *')
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
                sh 'npx playwright test --reporter=line || true'
            }
        }

    }

    post {
        always {
            emailext(
                to: 'omkardalvi861@gmail.com',
                subject: "Dubai Opera Tests — Build #${BUILD_NUMBER}: ${currentBuild.currentResult}",
                body: """
                    <html><body>
                        <h2>Dubai Opera — Playwright Test Results</h2>
                        <table border="1" cellpadding="8" style="border-collapse:collapse">
                            <tr><td><b>Build Number</b></td><td>#${BUILD_NUMBER}</td></tr>
                            <tr><td><b>Status</b></td><td>${currentBuild.currentResult}</td></tr>
                            <tr><td><b>Duration</b></td><td>${currentBuild.durationString}</td></tr>
                        </table>
                        <br/>
                        <a href="${BUILD_URL}console">View Console Output</a>
                    </body></html>
                """,
                mimeType: 'text/html'
            )
        }
    }
}