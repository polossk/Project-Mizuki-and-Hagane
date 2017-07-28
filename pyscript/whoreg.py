from __future__ import print_function
from pymongo import MongoClient
import time

def main():
	c = MongoClient('mongodb://username:password@localhost:23333/test?authSource=admin')
	posts = c.test.users
	ans = posts.find({"active": True}, {"username": 1})
	log = []
	for a in ans:
		log.append(a[u'username'])
		# print(a[u'username'])

	print(time.time(), '\n')
	print(len(log))
	print(';'.join(log))
if __name__ == '__main__':
	main()
