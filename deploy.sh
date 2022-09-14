#!/bin/bash
rm -f ./SpaMiddleware_Develop.zip
cd ./lambda
zip -r ../SpaMiddleware_Develop.zip ./
aws lambda update-function-code --function-name SpaMiddleware_Develop --zip-file fileb://../SpaMiddleware_Develop.zip
