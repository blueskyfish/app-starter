/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ServerConfiguration } from '../server-configuration';
import { UserHttpResponse } from '../user-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ChangePasswordPayload } from '../models/change-password-payload';
import { ChangeUserPayload } from '../models/change-user-payload';
import { LoginPayload } from '../models/login-payload';
import { LoginUser } from '../models/login-user';
import { RegisterPayload } from '../models/register-payload';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends BaseService {
  constructor(
    config: ServerConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation loginUser
   */
  static readonly LoginUserPath = '/login';

  /**
   * Try to log-in the user with her credentials
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser$Response(params: {
    body: LoginPayload
  }): Observable<UserHttpResponse<LoginUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.LoginUserPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as UserHttpResponse<LoginUser>;
      })
    );
  }

  /**
   * Try to log-in the user with her credentials
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loginUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser(params: {
    body: LoginPayload
  }): Observable<LoginUser> {

    return this.loginUser$Response(params).pipe(
      map((r: UserHttpResponse<LoginUser>) => r.body as LoginUser)
    );
  }

  /**
   * Path part for operation registerUser
   */
  static readonly RegisterUserPath = '/register';

  /**
   * Try to register a new user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser$Response(params: {
    body: RegisterPayload
  }): Observable<UserHttpResponse<LoginUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.RegisterUserPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as UserHttpResponse<LoginUser>;
      })
    );
  }

  /**
   * Try to register a new user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser(params: {
    body: RegisterPayload
  }): Observable<LoginUser> {

    return this.registerUser$Response(params).pipe(
      map((r: UserHttpResponse<LoginUser>) => r.body as LoginUser)
    );
  }

  /**
   * Path part for operation getUserInfo
   */
  static readonly GetUserInfoPath = '/user';

  /**
   * The information of the current user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserInfo$Response(params?: {
  }): Observable<UserHttpResponse<UserInfo>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.GetUserInfoPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as UserHttpResponse<UserInfo>;
      })
    );
  }

  /**
   * The information of the current user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserInfo(params?: {
  }): Observable<UserInfo> {

    return this.getUserInfo$Response(params).pipe(
      map((r: UserHttpResponse<UserInfo>) => r.body as UserInfo)
    );
  }

  /**
   * Path part for operation changeUser
   */
  static readonly ChangeUserPath = '/user';

  /**
   * Change the username and email
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeUser$Response(params: {
    body: ChangeUserPayload
  }): Observable<UserHttpResponse<UserInfo>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.ChangeUserPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as UserHttpResponse<UserInfo>;
      })
    );
  }

  /**
   * Change the username and email
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changeUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeUser(params: {
    body: ChangeUserPayload
  }): Observable<UserInfo> {

    return this.changeUser$Response(params).pipe(
      map((r: UserHttpResponse<UserInfo>) => r.body as UserInfo)
    );
  }

  /**
   * Path part for operation changePassword
   */
  static readonly ChangePasswordPath = '/user/password';

  /**
   * Change the user password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: {
    body: ChangePasswordPayload
  }): Observable<UserHttpResponse<UserInfo>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.ChangePasswordPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as UserHttpResponse<UserInfo>;
      })
    );
  }

  /**
   * Change the user password
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: {
    body: ChangePasswordPayload
  }): Observable<UserInfo> {

    return this.changePassword$Response(params).pipe(
      map((r: UserHttpResponse<UserInfo>) => r.body as UserInfo)
    );
  }

  /**
   * Path part for operation renewUser
   */
  static readonly RenewUserPath = '/renew';

  /**
   * Renew the user authorization
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renewUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  renewUser$Response(params?: {
  }): Observable<UserHttpResponse<LoginUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.RenewUserPath, 'put');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as UserHttpResponse<LoginUser>;
      })
    );
  }

  /**
   * Renew the user authorization
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renewUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  renewUser(params?: {
  }): Observable<LoginUser> {

    return this.renewUser$Response(params).pipe(
      map((r: UserHttpResponse<LoginUser>) => r.body as LoginUser)
    );
  }

}
