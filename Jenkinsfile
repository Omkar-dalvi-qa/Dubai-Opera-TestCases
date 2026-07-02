// Recursive closures inside a declarative `script {}` block frequently get
// rejected by Jenkins' CPS sandbox transformation (silently, if wrapped in a
// try/catch) — @NonCPS runs this as plain, non-serialized Groovy instead,
// which is the standard way to walk parsed JSON like this in a Jenkinsfile.
@NonCPS
def collectFailedTestTitles(suites) {
    def failedTests = []
    def walk
    walk = { suite ->
        suite.specs?.each { spec -> if (!spec.ok) failedTests.add(spec.title) }
        suite.suites?.each { child -> walk(child) }
    }
    suites.each { suite -> walk(suite) }
    return failedTests
}

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    // Jenkins job checks this repo out to run the Jenkinsfile in the first place.
    triggers {
        cron('0 */2 * * *')
    }

    tools {
        nodejs 'NodeJS-18'
    }

    environment {
        EMAIL_TO = 'omkar.dalvi@enpointe.io'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                // --with-deps installs the OS-level libraries Chromium needs.
                // Requires the Jenkins agent user to have permission to apt-install;
                // drop --with-deps if the agent image already has them baked in.
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Authenticate (Emaar PASS)') {
            steps {
                // Logs in once and saves the session to playwright/.auth/user.json,
                // which bookingFlow.spec.js's Venue Tour test then loads via
                // test.use({ storageState: ... }) — see tests/auth.setup.js.
                // Credentials come from utils/constants.js (committed on purpose,
                // shared QA account) — no Jenkins Credential needed for this.
                sh 'npx playwright test --project=setup'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'rm -rf test-results allure-results'
                // --project=chromium excludes the "setup" project — otherwise
                // Playwright re-runs auth.setup.js a second time here (it
                // already ran in the Authenticate stage above) and it gets
                // counted as one of the pass/fail totals in the report.
                sh 'npx playwright test --project=chromium'
            }
        }
    }

    post {
        always {
            // Attaches Playwright's own screenshots/traces to the build page so a
            // failure email links to something more useful than raw console text.
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true

            // Requires the Allure Jenkins plugin. Drop this block if it isn't installed.
            allure([
                includeProperties: false,
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
        }

        failure {
            script {
                def jsonFile = 'test-results/results.json'
                def passed = 'N/A'
                def failed = 'N/A'
                def skipped = 'N/A'
                def failedTestsHtml = 'N/A'

                if (fileExists(jsonFile)) {
                    try {
                        def results = readJSON(file: jsonFile)
                        passed  = results.stats.expected.toString()
                        failed  = results.stats.unexpected.toString()
                        skipped = results.stats.skipped.toString()

                        // Suite nesting depth varies: a bare test() (like
                        // auth.setup.js) puts specs directly on the file-level
                        // suite, while a test.describe() block (like
                        // bookingFlow.spec.js) adds one more suite level —
                        // collectFailedTestTitles() walks recursively instead
                        // of assuming a fixed depth.
                        def failedTests = collectFailedTestTitles(results.suites)

                        failedTestsHtml = failedTests.isEmpty()
                            ? 'None'
                            : failedTests.withIndex(1).collect { title, i -> "${i}. ${title}" }.join('<br/>')
                    } catch (err) {
                        echo "Could not parse ${jsonFile}: ${err}"
                    }
                }

                def testerName = sh(script: "git log -1 --pretty='%an'", returnStdout: true).trim()
                def testerMsg  = sh(script: "git log -1 --pretty='%s'",  returnStdout: true).trim()
                def testerDate = sh(script: "git log -1 --pretty='%ad' --date=format:'%d %b %Y %H:%M'", returnStdout: true).trim()

                emailext(
                    to: env.EMAIL_TO,
                    subject: "Dubai Opera — Build #${BUILD_NUMBER}: ${currentBuild.currentResult}",
                    body: """
                    <html>
                    <body style="font-family:Arial;background:#f4f4f4;margin:0;padding:0;">

                    <table width="100%" style="background:#8B0000;padding:20px 32px;">
                        <tr>
                            <td>
                                <h2 style="margin:0;color:#fff;font-size:20px;">DUBAI OPERA</h2>
                                <p style="margin:4px 0 0;color:#ffcccc;font-size:12px;">Automated Test Report</p>
                            </td>
                            <td align="right">
                                <span style="background:#e74c3c;color:#fff;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:bold;">
                                    ${currentBuild.currentResult}
                                </span>
                            </td>
                        </tr>
                    </table>

                    <table width="100%" style="padding:20px 32px;">
                    <tr><td>

                    <table width="100%" style="margin-bottom:16px;">
                        <tr>
                            <td width="33%" style="padding:4px;">
                                <table width="100%" style="background:#fff;border-radius:8px;border-top:4px solid #2ecc71;padding:16px;text-align:center;">
                                    <tr><td>
                                        <p style="margin:0;font-size:28px;font-weight:bold;color:#2ecc71;">${passed}</p>
                                        <p style="margin:4px 0 0;font-size:11px;color:#888;">PASSED</p>
                                    </td></tr>
                                </table>
                            </td>
                            <td width="33%" style="padding:4px;">
                                <table width="100%" style="background:#fff;border-radius:8px;border-top:4px solid #e74c3c;padding:16px;text-align:center;">
                                    <tr><td>
                                        <p style="margin:0;font-size:28px;font-weight:bold;color:#e74c3c;">${failed}</p>
                                        <p style="margin:4px 0 0;font-size:11px;color:#888;">FAILED</p>
                                    </td></tr>
                                </table>
                            </td>
                            <td width="33%" style="padding:4px;">
                                <table width="100%" style="background:#fff;border-radius:8px;border-top:4px solid #f39c12;padding:16px;text-align:center;">
                                    <tr><td>
                                        <p style="margin:0;font-size:28px;font-weight:bold;color:#f39c12;">${skipped}</p>
                                        <p style="margin:4px 0 0;font-size:11px;color:#888;">SKIPPED</p>
                                    </td></tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <table width="100%" style="background:#fff;border-radius:8px;overflow:hidden;margin-bottom:16px;">
                        <tr style="background:#8B0000;">
                            <td style="padding:10px 16px;color:#fff;font-size:12px;font-weight:bold;">FAILED TESTS</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 16px;color:#333;font-size:12px;">${failedTestsHtml}</td>
                        </tr>
                    </table>

                    <table width="100%" style="background:#fff;border-radius:8px;overflow:hidden;margin-bottom:16px;">
                        <tr style="background:#8B0000;">
                            <td colspan="2" style="padding:10px 16px;color:#fff;font-size:12px;font-weight:bold;">LATEST COMMIT</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 16px;color:#888;font-size:12px;width:30%;">Author</td>
                            <td style="padding:10px 16px;color:#333;font-size:12px;font-weight:bold;">${testerName}</td>
                        </tr>
                        <tr style="background:#fafafa;">
                            <td style="padding:10px 16px;color:#888;font-size:12px;">Message</td>
                            <td style="padding:10px 16px;color:#333;font-size:12px;">${testerMsg}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 16px;color:#888;font-size:12px;">Date</td>
                            <td style="padding:10px 16px;color:#333;font-size:12px;">${testerDate}</td>
                        </tr>
                    </table>

                    <table width="100%" style="background:#fff;border-radius:8px;overflow:hidden;margin-bottom:16px;">
                        <tr style="background:#8B0000;">
                            <td colspan="2" style="padding:10px 16px;color:#fff;font-size:12px;font-weight:bold;">BUILD DETAILS</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 16px;color:#888;font-size:12px;width:30%;">Build ID</td>
                            <td style="padding:10px 16px;color:#333;font-size:12px;font-family:monospace;font-weight:bold;">#${BUILD_NUMBER}</td>
                        </tr>
                        <tr style="background:#fafafa;">
                            <td style="padding:10px 16px;color:#888;font-size:12px;">Duration</td>
                            <td style="padding:10px 16px;color:#333;font-size:12px;">${currentBuild.durationString}</td>
                        </tr>
                    </table>

                    <table style="margin-top:16px;">
                        <tr>
                            <td style="padding-right:12px;">
                                <a href="${BUILD_URL}allure/" style="background:#8B0000;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;font-size:12px;font-weight:bold;">View Allure Report</a>
                            </td>
                            <td>
                                <a href="${BUILD_URL}console" style="background:#fff;color:#8B0000;padding:10px 20px;text-decoration:none;border-radius:6px;font-size:12px;font-weight:bold;border:2px solid #8B0000;">View Console</a>
                            </td>
                        </tr>
                    </table>

                    </td></tr></table>

                    <table width="100%" style="background:#333;padding:12px 32px;">
                        <tr><td>
                            <p style="margin:0;color:#888;font-size:11px;">Jenkins CI — Dubai Opera Test Pipeline</p>
                        </td></tr>
                    </table>

                    </body></html>
                    """,
                    mimeType: 'text/html'
                )
            }
        }
    }
}
