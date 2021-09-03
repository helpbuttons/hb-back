// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback4-example-microservices
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {User} from '../models';

export const def = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Accounts Microservice',
    description:
      'This is the api for the accounts service created by loopback.',
  },
  paths: {
    '/user/login': {
      get: {
        'x-operation-name': 'login',
        parameters: [
          {
            name: 'username',
            in: 'query',
            required: true,
          },
          {
            name: 'password',
            in: 'query',
            required: true,
            schema: {
              type: 'string',
              format: 'password'
            }
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: User,
    },
  },
};
