# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column  |Type   |Options   |
|--------|-------|----------|
|id      |integer|null:false|
|name    |string |null:false| 
|emaill  |string |null:false| 
|password|string |null:false|  
### Association
- has_many : chats
- has_many : groups through : groups_users
- has_many : groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル
|Column  |Type   |Options   |
|--------|-------|----------|
|id      |integer|null:false|
|name    |string |null:false| 
### Association
- has_many : users through : groups_users
- has_many : groups_users
- has_many : chats


## chats
|Column  |Type   |Options   |
|--------|-------|----------|
|text    |text   |          |
|imge    |text   |          | 
|user_id |integer|null: false, foreign_key: true|  
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


<!-- 61b91872795d60d498e67e926a24d69db395990b60053912c060e9eb8a7de3217448c4db41ab658ce0a58c7a53aa72e0b56d1bea80b7ad020901f555e0577ed8 -->
