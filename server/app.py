from flask import Flask, request, abort, make_response
from flask.globals import session
import requests
import mysql.connector as mysql
from settings import apikey, dbpwd
import json
import bcrypt
import uuid 

db = mysql.connect(
	host="localhost",
	user="root",
	passwd=dbpwd,
	database="blog"
)


app = Flask(__name__)

@app.route('/api/login', methods=['POST'])
def login():
	data = request.get_json()
	query = "select id, password from users where username = %s "
	values = (data['user'], )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	if not record:
			abort(401)
	user_id = record[0]
	hashed_pwd = record[1].encode('utf-8')
	if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pwd) != hashed_pwd:
			abort(401)

	session_id = str(uuid.uuid4())
	query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
	values = (user_id, session_id, session_id)
	cursor.execute(query, values)
	db.commit()
	resp = make_response()
	resp.set_cookie("session_id", session_id)
	cursor.close()
	
	return resp

@app.route('/api/logout', methods=['POST'])
def logout():
	id = validate_session()
	print("SESSION ID ", id)
	query = "delete from sessions where session_id = %s"
	values = (id,)
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	resp = make_response()
	resp.set_cookie('session_id' ,'', expires=0)
	cursor.close()
	return resp

def validate_session():
	session_id = request.cookies.get('session_id')
	print(request.cookies.get('session_id'))
	if not session_id:
		abort(401)
	query = "select user_id from sessions where session_id = %s"
	cursor = db.cursor()
	values = (session_id,)
	cursor.execute(query, values)
	record = cursor.fetchone()
	cursor.close()
	if not record:
		abort(401)
	return session_id

@app.route('/api/signup', methods=['POST'])
def signup():
	data = request.get_json()
	query = "insert into users (username, password) values(%s, %s)"
	hashed_pwd = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
	values = (data['user'], hashed_pwd)
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	new_post_id = cursor.lastrowid
	cursor.close()
	return get_user(new_post_id)

@app.route('/api/posts/<id>', methods=['GET', 'DELETE','PUT'])
def post_operations(id):
	if request.method == 'GET':
		return get_post(id)
	if request.method == 'DELETE':
		return delete_post(id)
	if request.method == 'PUT':
		return update_post(id)

def get_post(id):
	query = "select id, title, content, image, author_id from posts where id = %s"
	values = (id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	cursor.close()
	header = ['id', 'title', 'content', 'image', 'author_id']
	return json.dumps(dict(zip(header, record)))

def delete_post(id):
	query = "DELETE FROM posts WHERE id = %s"
	values = (id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	cursor.close()
	return "Deleted post "

def update_post(id):
	data = request.get_json()
	query = "UPDATE posts set title=(%s), content=(%s), image=(%s) where id=%s "
	values = (data['title'], data['content'], data['image'], id)
	print("UPDATING POST")
	print(data['title'], data['content'], data['image'], id)
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	cursor.close()
	return "Post updated"

@app.route('/api/posts/<id>/comments', methods=['GET', 'POST'])
def comments(id):
	if request.method == 'GET':
		return get_all_comments(id)
	if request.method == 'POST':
		return add_comment(id)

def add_comment(id):
	data = request.get_json()
	query = "INSERT INTO comments (author_id, post_id, content) VALUES (%s, %s, %s)"
	values = (data['author_id'], id, data['content'])
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	new_comment_id = cursor.lastrowid

	cursor.close()
	return get_comment(new_comment_id)

def get_all_comments(id):
	query = "SELECT id, author_id, post_id, content FROM comments WHERE post_id=%s"
	values = (id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	records = cursor.fetchall()
	cursor.close()
	header = [ 'comment_id', 'author_id', 'post_id', 'content']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
	return json.dumps(data)

def get_comment(id):
	query = "SELECT id, author_id, post_id, content FROM comments WHERE id=%s"
	values = (id,)
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	cursor.close()
	header = ['comment_id', 'author_id', 'post_id', 'content']

	return json.dumps(dict(zip(header, record)))


@app.route('/api/posts', methods=['GET', 'POST'])
def manage_posts():
	if request.method == 'GET':
		return get_all_posts()
	if request.method == 'POST':
		return add_post()

def add_post():
	data = request.get_json()
	query = "insert into posts (title, content, image, author_id) values(%s, %s, %s, %s)"
	values = (data['title'], data['content'], data['image'], data['author_id'])
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	new_post_id = cursor.lastrowid
	cursor.close()
	return get_post(new_post_id)

def get_all_posts():
	query="select id, title, content, image, author_id from posts "
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	cursor.close()
	header = ['id', 'title', 'content', 'image', 'author_id']
	data = []
	for r in records:
		data.append(dict(zip(header,r)))
	return json.dumps(data)

@app.route('/api/users/<id>')
def get_user(id):
	query = "select id, username, password from users where id = %s"
	values = (id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	cursor.close()
	header = ['id', 'username', 'password']
	return json.dumps(dict(zip(header, record)))

@app.route('/api/user', methods=['GET'])
def check_login():
	session_id = request.cookies.get('session_id')
	if not session_id:
		abort(401)
	query = "select user_id from sessions where session_id = %s"
	values = (session_id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	cursor.close()
	if not record:
		abort(401)
	header = ['user_id']
	return json.dumps(dict(zip(header, record)))

if __name__ == "__main__":
	app.run()