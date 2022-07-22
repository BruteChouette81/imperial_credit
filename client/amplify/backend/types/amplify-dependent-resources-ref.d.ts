export type AmplifyDependentResourcesAttributes = {
    "function": {
        "mylambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "server": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}