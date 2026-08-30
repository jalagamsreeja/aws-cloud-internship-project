# Intermediate AWS Cloud Project

## Project
Service Request Portal

## Architecture
S3 Static Website
    -> API Gateway HTTP API
    -> AWS Lambda
    -> Amazon DynamoDB

## API
POST /requests
GET /requests

API base URL:
https://vet6zj4533.execute-api.ap-south-1.amazonaws.com/requests

## DynamoDB
Table: ServiceRequests
Partition key: requestId (String)

## Frontend
- index.html
- style.css
- script.js

## Backend
- lambda_function.py

## Features
- Structured request validation
- Request creation
- Request retrieval
- Error handling
- DynamoDB persistence

## Security
Never commit AWS access keys, secret keys, passwords, or other credentials to GitHub.
