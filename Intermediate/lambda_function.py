import json
import boto3
import uuid
from datetime import datetime, timezone

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("ServiceRequests")

def lambda_handler(event, context):
    try:
        method = event.get("requestContext", {}).get("http", {}).get("method", "")

        if method == "POST":
            body = json.loads(event.get("body") or "{}")

            name = body.get("name", "").strip()
            email = body.get("email", "").strip()
            request_type = body.get("requestType", "").strip()
            description = body.get("description", "").strip()

            if not name or not email or not request_type or not description:
                return {
                    "statusCode": 400,
                    "body": json.dumps({
                        "message": "Please fill in all fields."
                    })
                }

            request_id = str(uuid.uuid4())
            created_at = datetime.now(timezone.utc).isoformat()

            table.put_item(
                Item={
                    "requestId": request_id,
                    "name": name,
                    "email": email,
                    "requestType": request_type,
                    "description": description,
                    "createdAt": created_at
                }
            )

            return {
                "statusCode": 200,
                "body": json.dumps({
                    "message": "Request submitted successfully!",
                    "requestId": request_id
                })
            }

        elif method == "GET":
            response = table.scan()

            return {
                "statusCode": 200,
                "body": json.dumps({
                    "requests": response.get("Items", [])
                })
            }

        return {
            "statusCode": 405,
            "body": json.dumps({
                "message": "Method not allowed."
            })
        }

    except Exception as error:
        print("ERROR:", str(error))

        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": "Internal server error."
            })
        }
