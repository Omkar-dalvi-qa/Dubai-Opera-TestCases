pipeline {
    agent any

    triggers {
        cron('0 */2 * * *')
    }

    tools {
        nodejs 'NodeJS-18'
    }

    stages {

        // Stage 1 - pull code from GitHub
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Omkar-dalvi-qa/Dubai-Opera-TestCases.git'
            }
        }

        // Stage 2 - install node modules and playwright browsers
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        // Stage 3 - run the actual tests
        // "|| true" means even if tests fail, don't stop here
        // keep going so we can still send the email
        stage('Run Tests') {
            steps {
                sh 'npx playwright test --reporter=line,allure-playwright || true'
            }
        }

        // Stage 4 - THIS IS THE NEW STAGE
        // Opens results.json and reads pass/fail numbers
        // Saves them as TEST_PASSED, TEST_FAILED, TEST_SKIPPED
        // so we can use them in the email later
        stage('Parse Results') {
            steps {
                script {
                    def results  = readJSON file: 'test-results/results.json'
                    def passed   = results.stats.expected
                    def failed   = results.stats.unexpected
                    def skipped  = results.stats.skipped
                    env.TEST_PASSED  = passed.toString()
                    env.TEST_FAILED  = failed.toString()
                    env.TEST_SKIPPED = skipped.toString()
                }
            }
        }

        // Stage 5 - generate the allure HTML report
        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }

    }

    // This runs AFTER all stages finish
    // sends the email with the numbers we saved above
    post {
        always {
            allure([
                includeProperties: false,
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])

            emailext(
                to: 'omkar.dalvi@enpointe.io',
                subject: "Dubai Opera Tests — Build #${BUILD_NUMBER}: ${currentBuild.currentResult}",
                body: """
                    <html><body>
                        <h2>Dubai Opera — Playwright Test Results</h2>
                        <table border="1" cellpadding="8" style="border-collapse:collapse">
                            <tr><td><b>Build Number</b></td><td>#${BUILD_NUMBER}</td></tr>
                            <tr><td><b>Status</b></td><td>${currentBuild.currentResult}</td></tr>
                            <tr><td><b>Passed</b></td><td style="color:green">${TEST_PASSED}</td></tr>
                            <tr><td><b>Failed</b></td><td style="color:red">${TEST_FAILED}</td></tr>
                            <tr><td><b>Skipped</b></td><td style="color:orange">${TEST_SKIPPED}</td></tr>
                            <tr><td><b>Duration</b></td><td>${currentBuild.durationString}</td></tr>
                        </table>
                        <br/>
                        <a href="${BUILD_URL}allure/">View Full Allure Report</a>
                    </body></html>
                """,
                mimeType: 'text/html'
            )
        }
    }
}