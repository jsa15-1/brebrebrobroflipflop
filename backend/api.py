from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import base64, json, os

app = Flask(__name__)
api = Api(app)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

parser = reqparse.RequestParser()
parser.add_argument('email', type=str, help='Email address is required', required=True)
parser.add_argument('password', type=str, help='Password is required', required=True)


class CreateAccount(Resource):
    def post(self, base64_str):
        email_password_str = base64.b64decode(base64_str).decode('utf-8')
        email, password = email_password_str.split(':')
        with open('account.json', 'r+') as f:
            data = json.load(f)
            data[email] = password
            f.seek(0)
            json.dump(data, f)

            return {'message': f'Account for {email} created successfully'}, 201


class Login(Resource):
    def get(self, base64_str):
        email_password_str = base64.b64decode(base64_str).decode('utf-8')
        email, password = email_password_str.split(':')

        with open('account.json', 'r') as f:
            data = json.load(f)
            if email not in data:
                return {'message': f'Account for {email} does not exist'}, 404

            if data[email] == password:
                return {'message': 'SUCCESS'}, 200
            else:
                return {'message': 'FAILURE'}, 401
            
# class Buy(Resource):
#     def get(self, base64_str):
#         getProduct = base64.b64decode(base64_str).decode('utf-8')

#         prodList = json.JSONDecoder(open('product.json', 'r'))
#         print(prodList)
#         # print(json.JSONDecoder(getProduct))



api.add_resource(CreateAccount, '/CreateAccount/<string:base64_str>')
api.add_resource(Login, '/Login/<string:base64_str>')
# api.add_resource(Buy, '/Buy/<string:base64_str>')

if __name__ == '__main__':
  app.run(port=6263, debug=True)