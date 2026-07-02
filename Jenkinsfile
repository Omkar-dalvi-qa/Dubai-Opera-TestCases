pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    // Runs on this repo directly — no separate clone step needed since the
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
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Attaches Playwright's own screenshots/traces to the build page so a
            // failure email links to something more useful than raw console text.
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
        failure {
            emailext(
                to: env.EMAIL_TO,
                subject: "Dubai Opera — Build #${BUILD_NUMBER} FAILED",
                body: """
                    <p>The Dubai Opera Playwright suite failed.</p>
                    <p><b>Build:</b> #${BUILD_NUMBER}</p>
                    <p><a href="${BUILD_URL}console">View Console Output</a></p>
                    <p><a href="${BUILD_URL}artifact/test-results/">View Failure Screenshots</a></p>
                """,
                mimeType: 'text/html'
            )
        }
    }
}
