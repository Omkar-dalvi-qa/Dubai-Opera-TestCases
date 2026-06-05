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
        sh 'mkdir -p test-results'
        // removed --reporter flag — config file handles all reporters now
        sh 'npx playwright test || true'
    }
}
        stage('Parse Results') {
    steps {
        script {
            try {
                // Print the file so we can see its structure
                sh 'cat test-results/results.json'
                def results = readJSON file: 'test-results/results.json'
                echo "Stats: ${results.stats}"
                env.TEST_PASSED  = results.stats.expected.toString()
                env.TEST_FAILED  = results.stats.unexpected.toString()
                env.TEST_SKIPPED = results.stats.skipped.toString()
                echo "Passed: ${TEST_PASSED}, Failed: ${TEST_FAILED}, Skipped: ${TEST_SKIPPED}"
            } catch (err) {
                echo "Could not read results.json: ${err}"
                env.TEST_PASSED  = 'N/A'
                env.TEST_FAILED  = 'N/A'
                env.TEST_SKIPPED = 'N/A'
            }
        }
    }
}

        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate allure-results --clean --output allure-report || true'
            }
        }

    }

    post {
        always {
            // Publish Allure report in Jenkins UI
            allure([
                includeProperties: false,
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])

            // Send email
            emailext(
                to: 'omkardalvi861@gmail.com',
                subject: "Dubai Opera Tests — Build #${BUILD_NUMBER}: ${currentBuild.currentResult}",
                body: """
                    <html><body>
                        <h2>Dubai Opera — Playwright Test Results</h2>
                        <table border="1" cellpadding="8" style="border-collapse:collapse">
                            <tr>
                                <td><b>Build Number</b></td>
                                <td>#${BUILD_NUMBER}</td>
                            </tr>
                            <tr>
                                <td><b>Status</b></td>
                                <td style="color:${currentBuild.currentResult == 'SUCCESS' ? 'green' : 'red'}">
                                    <b>${currentBuild.currentResult}</b>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Passed</b></td>
                                <td style="color:green"><b>${TEST_PASSED}</b></td>
                            </tr>
                            <tr>
                                <td><b>Failed</b></td>
                                <td style="color:red"><b>${TEST_FAILED}</b></td>
                            </tr>
                            <tr>
                                <td><b>Skipped</b></td>
                                <td style="color:orange"><b>${TEST_SKIPPED}</b></td>
                            </tr>
                            <tr>
                                <td><b>Duration</b></td>
                                <td>${currentBuild.durationString}</td>
                            </tr>
                        </table>
                        <br/>
                        <a href="${BUILD_URL}allure/">View Allure Report</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="${BUILD_URL}console">View Console Output</a>
                    </body></html>
                """,
                mimeType: 'text/html'
            )
        }
    }
}