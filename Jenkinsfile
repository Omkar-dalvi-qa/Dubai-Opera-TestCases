pipeline {
    
    agent any

    parameters {
    string(name: 'DEV_AUTHOR', defaultValue: 'N/A', description: 'Developer name')
    string(name: 'DEV_COMMIT', defaultValue: 'N/A', description: 'Dev commit message')
    string(name: 'DEV_DATE',   defaultValue: 'N/A', description: 'Dev commit date')
    string(name: 'DEV_HASH',   defaultValue: 'N/A', description: 'Dev commit hash')
    string(name: 'DEV_EMAIL',  defaultValue: 'N/A', description: 'Developer email')
}

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
        // Clean old results before running
        sh 'rm -rf allure-results'
        sh 'rm -rf allure-report'
        sh 'mkdir -p test-results'
        sh 'npx playwright test || true'
    }
}

        stage('Parse Results') {
    steps {
        script {
            // ── Test counts ──
            try {
                def results = readJSON file: 'test-results/results.json'
                env.TEST_PASSED  = results.stats.expected.toString()
                env.TEST_FAILED  = results.stats.unexpected.toString()
                env.TEST_SKIPPED = results.stats.skipped.toString()

                // ── Failed test names ──
                def failedTests = []
                results.suites.each { suite ->
                    suite.suites.each { inner ->
                        inner.specs.each { spec ->
                            if (!spec.ok) failedTests.add(spec.title)
                        }
                    }
                }
                env.FAILED_TEST_NAMES = failedTests.size() > 0
                    ? failedTests.join('<br/>')
                    : 'None'

            } catch (err) {
                echo "Could not read results.json: ${err}"
                env.TEST_PASSED       = 'N/A'
                env.TEST_FAILED       = 'N/A'
                env.TEST_SKIPPED      = 'N/A'
                env.FAILED_TEST_NAMES = 'N/A'
            }

            // ── Git info ──
            env.GIT_COMMIT_AUTHOR = sh(
                script: "git log -1 --pretty='%an'",
                returnStdout: true).trim()
            env.GIT_COMMIT_MSG    = sh(
                script: "git log -1 --pretty='%s'",
                returnStdout: true).trim()
            env.GIT_COMMIT_TIME   = sh(
                script: "git log -1 --pretty='%ad' --date=format:'%d %b %Y %H:%M'",
                returnStdout: true).trim()

            // ── Previous build status ──
            def prevBuild = currentBuild.previousBuild
            env.PREV_BUILD_STATUS = prevBuild
                ? prevBuild.result.toString()
                : 'N/A'

            // ── Regression check ──
            env.REGRESSION_TESTS = (
                prevBuild?.result == 'UNSTABLE' &&
                env.TEST_FAILED != '0'
            ) ? 'Yes' : 'None'
        }
    }
}
    }

    post {
    always {
        allure([
            includeProperties: false,
            reportBuildPolicy: 'ALWAYS',
            results: [[path: 'allure-results']]
        ])

        emailext(
            to: "omkardalvi861@gmail.com, ${params.DEV_EMAIL}",
            subject: "Dubai Opera Tests — Build #${BUILD_NUMBER}: ${currentBuild.currentResult}",
            body: """
                <html>
                <body style="margin:0;padding:0;font-family:Arial,sans-serif;
                    background-color:#f4f4f4;">

                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="background-color:#8B0000;">
                    <tr>
                        <td style="padding:24px 32px;">
                            <h1 style="margin:0;color:#ffffff;font-size:22px;
                                letter-spacing:1px;">DUBAI OPERA</h1>
                            <p style="margin:4px 0 0;color:#ffcccc;font-size:13px;">
                                Automated Test Report — Build #${BUILD_NUMBER}
                            </p>
                        </td>
                        <td align="right" style="padding:24px 32px;">
                            <span style="
                                background-color:${currentBuild.currentResult == 'SUCCESS'
                                    ? '#2ecc71' : currentBuild.currentResult == 'UNSTABLE'
                                    ? '#f39c12' : '#e74c3c'};
                                color:#ffffff;padding:8px 18px;border-radius:20px;
                                font-size:13px;font-weight:bold;">
                                ${currentBuild.currentResult}
                            </span>
                        </td>
                    </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="padding:24px 32px;background-color:#f4f4f4;">
                <tr><td>

                <!-- Stats cards -->
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td width="24%" style="padding:4px;">
                            <table width="100%" cellpadding="16"
                                style="background:#ffffff;border-radius:8px;
                                border-top:4px solid #2ecc71;">
                                <tr><td align="center">
                                    <p style="margin:0;font-size:32px;
                                        font-weight:bold;color:#2ecc71;">
                                        ${TEST_PASSED}</p>
                                    <p style="margin:4px 0 0;font-size:12px;
                                        color:#888;text-transform:uppercase;
                                        letter-spacing:1px;">Passed</p>
                                </td></tr>
                            </table>
                        </td>
                        <td width="24%" style="padding:4px;">
                            <table width="100%" cellpadding="16"
                                style="background:#ffffff;border-radius:8px;
                                border-top:4px solid #e74c3c;">
                                <tr><td align="center">
                                    <p style="margin:0;font-size:32px;
                                        font-weight:bold;color:#e74c3c;">
                                        ${TEST_FAILED}</p>
                                    <p style="margin:4px 0 0;font-size:12px;
                                        color:#888;text-transform:uppercase;
                                        letter-spacing:1px;">Failed</p>
                                </td></tr>
                            </table>
                        </td>
                        <td width="24%" style="padding:4px;">
                            <table width="100%" cellpadding="16"
                                style="background:#ffffff;border-radius:8px;
                                border-top:4px solid #f39c12;">
                                <tr><td align="center">
                                    <p style="margin:0;font-size:32px;
                                        font-weight:bold;color:#f39c12;">
                                        ${TEST_SKIPPED}</p>
                                    <p style="margin:4px 0 0;font-size:12px;
                                        color:#888;text-transform:uppercase;
                                        letter-spacing:1px;">Skipped</p>
                                </td></tr>
                            </table>
                        </td>
                        <td width="24%" style="padding:4px;">
                            <table width="100%" cellpadding="16"
                                style="background:#ffffff;border-radius:8px;
                                border-top:4px solid #3498db;">
                                <tr><td align="center">
                                    <p style="margin:0;font-size:18px;
                                        font-weight:bold;color:#3498db;">
                                        ${PREV_BUILD_STATUS ?: 'N/A'}</p>
                                    <p style="margin:4px 0 0;font-size:12px;
                                        color:#888;text-transform:uppercase;
                                        letter-spacing:1px;">Prev Build</p>
                                </td></tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Action Required Banner (only shows if tests failed) -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="margin-top:16px;background:${TEST_FAILED != '0'
                        ? '#fff3cd' : '#d4edda'};
                    border-radius:8px;border-left:4px solid ${TEST_FAILED != '0'
                        ? '#f39c12' : '#2ecc71'};">
                    <tr>
                        <td style="padding:12px 20px;font-size:13px;
                            color:${TEST_FAILED != '0' ? '#856404' : '#155724'};">
                            ${TEST_FAILED != '0'
                                ? '⚠️ Action Required — ' + TEST_FAILED + ' test(s) need attention. Check failed tests below.'
                                : '✅ All tests passed — No action required.'}
                        </td>
                    </tr>
                </table>

                <!-- Failed Tests (only shows if failed > 0) -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="margin-top:16px;background:#ffffff;
                    border-radius:8px;overflow:hidden;">
                    <tr style="background:#e74c3c;">
                        <td colspan="2" style="padding:12px 20px;">
                            <p style="margin:0;color:#fff;font-size:13px;
                                font-weight:bold;letter-spacing:1px;">
                                FAILED TESTS
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;width:30%;">Failed test(s)</td>
                        <td style="padding:12px 20px;color:#e74c3c;
                            font-size:13px;font-weight:bold;">
                            ${FAILED_TEST_NAMES ?: 'None'}
                        </td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:12px 20px;color:#888;font-size:13px;">
                            Regression</td>
                        <td style="padding:12px 20px;font-size:13px;">
                            <span style="background:${REGRESSION_TESTS == 'None'
                                ? '#e74c3c' : '#f39c12'};
                                color:#fff;padding:3px 10px;
                                border-radius:12px;font-size:11px;">
                                ${REGRESSION_TESTS == 'None'
                                    ? 'NEW FAILURE' : 'REGRESSION'}
                            </span>
                        </td>
                    </tr>
                </table>

                <!-- Dev Repo -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="margin-top:16px;background:#ffffff;
                    border-radius:8px;overflow:hidden;">
                    <tr style="background:#2c3e50;">
                        <td colspan="2" style="padding:12px 20px;">
                            <p style="margin:0;color:#fff;font-size:13px;
                                font-weight:bold;letter-spacing:1px;">
                                LATEST PUSH IN DEV REPO
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;width:30%;">Developer</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;font-weight:bold;">
                            ${params.DEV_AUTHOR} (${params.DEV_EMAIL})
                        </td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Last Commit</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;">${params.DEV_COMMIT}</td>
                    </tr>
                    <tr>
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Last Date</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;">${params.DEV_DATE}</td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Commit Hash</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;font-family:monospace;">
                            ${params.DEV_HASH}</td>
                    </tr>
                </table>

                <!-- Test Repo -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="margin-top:16px;background:#ffffff;
                    border-radius:8px;overflow:hidden;">
                    <tr style="background:#8B0000;">
                        <td colspan="2" style="padding:12px 20px;">
                            <p style="margin:0;color:#fff;font-size:13px;
                                font-weight:bold;letter-spacing:1px;">
                                LATEST PUSH IN TEST REPO
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;width:30%;">Tester</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;font-weight:bold;">
                            ${GIT_COMMIT_AUTHOR}</td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Last Commit</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;">${GIT_COMMIT_MSG}</td>
                    </tr>
                    <tr>
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Last Date</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;">${GIT_COMMIT_TIME}</td>
                    </tr>
                </table>

                <!-- Build Details -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="margin-top:16px;background:#ffffff;
                    border-radius:8px;overflow:hidden;">
                    <tr style="background:#8B0000;">
                        <td colspan="2" style="padding:12px 20px;">
                            <p style="margin:0;color:#fff;font-size:13px;
                                font-weight:bold;letter-spacing:1px;">
                                BUILD DETAILS
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;width:30%;">Build ID</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;font-family:monospace;
                            font-weight:bold;">
                            BUILD-${BUILD_NUMBER.padLeft(4,'0')}
                        </td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Browser</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;">Chromium (Desktop)</td>
                    </tr>
                    <tr>
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Environment</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;">localhost:3000</td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Branch</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;">main</td>
                    </tr>
                    <tr>
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Duration</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;">${currentBuild.durationString}</td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:12px 20px;color:#888;
                            font-size:13px;">Triggered by</td>
                        <td style="padding:12px 20px;color:#333;
                            font-size:13px;">
                            Dev push by ${params.DEV_AUTHOR}
                        </td>
                    </tr>
                </table>

                <!-- Buttons -->
                <table cellpadding="0" cellspacing="0"
                    style="margin-top:24px;">
                    <tr>
                        <td style="padding-right:12px;">
                            <a href="${BUILD_URL}allure/" style="
                                background-color:#8B0000;color:#ffffff;
                                padding:12px 24px;text-decoration:none;
                                border-radius:6px;font-size:13px;
                                font-weight:bold;display:inline-block;">
                                View Allure Report
                            </a>
                        </td>
                        <td>
                            <a href="${BUILD_URL}console" style="
                                background-color:#ffffff;color:#8B0000;
                                padding:12px 24px;text-decoration:none;
                                border-radius:6px;font-size:13px;
                                font-weight:bold;display:inline-block;
                                border:2px solid #8B0000;">
                                View Console Output
                            </a>
                        </td>
                    </tr>
                </table>

                </td></tr></table>

                <!-- Footer -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="background:#333;padding:16px 32px;">
                    <tr>
                        <td>
                            <p style="margin:0;color:#888;font-size:12px;">
                                Automated message from Jenkins CI —
                                Dubai Opera Test Pipeline
                            </p>
                            <p style="margin:4px 0 0;color:#888;font-size:12px;">
                                Triggered on every developer push to dev repo
                            </p>
                        </td>
                    </tr>
                </table>

                </body></html>
            """,
            mimeType: 'text/html'
        )
    }
}
}