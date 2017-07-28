from __future__ import print_function
from pymongo import MongoClient
import time

def main():
	c = MongoClient('mongodb://username:password@localhost:23333/test?authSource=admin')
	posts = c.test.users
	print("Totle:\t{0}".format(posts.count()))
	titles = ["prof", "asprof", "lect", "stu", "other"]
	for title in titles:
		print("\t{0}:\t{1}".format(title, posts.find({"title": title}).count()))
	rep = posts.find({"goingtoreport": True}, {"usershowid": 1})
	hot = posts.find({"goingtohotel": True}, {"usershowid": 1})
	rrep = []
	rhot = []
	for a in rep: rrep.append(a[u'usershowid'])
	for a in hot: rhot.append(a[u'usershowid'])
	print('\n\treports: [{0}]'.format(len(rrep)), ' '.join(rrep))
	print('\n\thotels: [{0}]'.format(len(rhot)), ' '.join(rhot))

	print(time.time(), '\n')

if __name__ == '__main__':
	main()