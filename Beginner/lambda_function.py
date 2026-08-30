import json

def lambda_handler(event, context):
    try:
        body = json.loads(event.get("body") or "{}")

        name = str(body.get("name", "")).strip()
        email = str(body.get("email", "")).strip()
        department = str(body.get("department", "")).strip()
        rating = str(body.get("rating", "")).strip()
        feedback = str(body.get("feedback", "")).strip()

        if not all([name, email, department, rating, feedback]):
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "message": "Please fill in all fields."
                })
            }

        print("Name:", name)
        print("Email:", email)
        print("Department:", department)
        print("Rating:", rating)
        print("Feedback:", feedback)

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Feedback submitted successfully."
            })
        }

    except Exception as error:
        print("ERROR:", str(error))
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Internal server error."
            })
        }
