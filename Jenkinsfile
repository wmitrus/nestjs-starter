pipeline {
    agent any
    stages {
        stage('install') {
            steps {
                echo 'Installing...'
                sh 'yarn install'
            }
        }
        stage('build') {
            steps {
                echo 'Building...'
                sh 'yarn build'
            }
        }
        stage('prisma') {
            steps {
                sh 'npx prisma generate'
            }
        }
        stage('test') {
            steps {
                echo 'Testing...'
                sh 'yarn test'
            }
        }
        stage('deploy') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ssh', keyFileVariable: 'sshkey')]) {
                    echo 'Deploying...'
                    sh '''#!/bin/bash

                    '''
                }
            }
        }
    }
}
