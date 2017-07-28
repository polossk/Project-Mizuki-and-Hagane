from __future__ import print_function
from pymongo import MongoClient
import sys, time

def main():
	if len(sys.argv) < 2:
		sys.exit()
	numbers = sys.argv[1:]
	c = MongoClient('mongodb://username:password@localhost:23333/test?authSource=admin')
	posts = c.test.users
	for uid in numbers:
		posts.update({"usershowid": uid}, {"$set": {"paidconfirm": False}})
		print("update uid = {0} with paidconfirm := False.".format(uid))

	print(time.time(), '\n')

if __name__ == '__main__':
	main()
