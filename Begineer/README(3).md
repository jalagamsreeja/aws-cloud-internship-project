# AWS Cloud Internship – Beginner Level

## Project: Service Request Form

A simple cloud-hosted service request application built for the AWS Cloud Internship Beginner Level task.

## Objective

The application provides a static web form through which users can submit a service request. The frontend is hosted using AWS S3 and communicates with a serverless backend through an AWS Lambda Function URL.

## AWS Services Used

- **Amazon S3** – Hosts the static frontend files.
- **AWS Lambda** – Processes submitted service requests.
- **Lambda Function URL** – Provides the HTTPS endpoint used by the frontend to invoke the Lambda function.

## Project Structure

```text
Beginner/
├── index.html
├── script.js
├── style.css
└── README.md
```

## Form Details

The form collects:

- Full Name
- Email
- Request Type
- Request Description

The frontend performs basic required-field validation before submitting the request.

## Request Flow

```text
User
  ↓
Service Request Form
  ↓
Amazon S3 Hosted Frontend
  ↓
JavaScript POST Request
  ↓
AWS Lambda Function URL
  ↓
Lambda Processing
  ↓
Success / Failure Response
```

## Lambda Function URL

The frontend is configured to send requests to:

https://ch4zg4yonv3x2pv5qs6x4ua3em0omvlt.lambda-url.ap-south-1.on.aws/

## Response Handling

After submission, the frontend displays a success message when the request is processed successfully. If the request fails or the backend cannot be reached, an appropriate failure message is displayed.

## Beginner-Level Requirements Covered

- Static frontend hosted on AWS
- S3-based website hosting
- Service request form
- Lambda-based serverless processing
- Basic request validation
- Success/failure response handling
- Low-traffic and free-tier-oriented deployment approach
- Basic frontend-to-backend cloud architecture

## Files

### `index.html`
Contains the service request form and page structure.

### `style.css`
Contains the styling for the web page and form.

### `script.js`
Collects the form data and sends it to the AWS Lambda Function URL using an HTTP POST request.

## Architecture

The project demonstrates a basic serverless workflow where the frontend is separated from backend processing. The static frontend is served from AWS storage, while Lambda handles the backend action without requiring a dedicated server.

## Project Status

**Beginner Level – Completed**
