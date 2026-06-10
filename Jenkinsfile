pipeline {
    agent any

    parameters {
        string(name: 'DEV_AUTHOR', defaultValue: 'N/A', description: '')
        string(name: 'DEV_EMAIL',  defaultValue: 'N/A', description: '')
        string(name: 'DEV_MSG',    defaultValue: 'N/A', description: '')
        string(name: 'DEV_DATE',   defaultValue: 'N/A', description: '')
        string(name: 'DEV_HASH',   defaultValue: 'N/A', description: '')
    }

    options {
        disableConcurrentBuilds()
    }

    triggers {
        cron('0 */2 * * *')
    }