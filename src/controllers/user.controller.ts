// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback4-example-microservices
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {api} from '@loopback/rest';
import {def} from './user.controller.api';
import {UserRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {User} from '../models';
import {
    Filter,
    Where,
  } from '@loopback/repository';

@api(def)
export class UserController {
  constructor(
    @repository('UserRepository')
    private UserRepository: UserRepository,
  ) {}

  async login(username: string, password: string): Promise<Object> {
    return await this.UserRepository.login(username, password);
  }
}
