# -*- coding: UTF-8 -*-
import xlsxwriter
import urllib.request
import json
import os
# 定义函数
def getSomeJson(start,end):
	# 全局路径
	globalPath = os.getcwd()
	print('globalPath:'+globalPath)
	id=start
	streetIdStartPoint = 1
	while id < end :
		print('外层遍历，第' + str(id) + '次')
		cityhtml = urllib.request.urlopen('http://fzwjg.com/m2/s/index.php?cityid='+str(id)).read()
		isExist=os.path.exists(globalPath+'\\'+str(id))
		if not isExist:
			os.makedirs("city"+str(id))
		os.chdir(globalPath+'\\city'+str(id))
		print('创建并进入一级目录，此时的路径为：' + globalPath+'\\city'+str(id))

		with open("cityinfo.json","wb") as f:
			f.write(cityhtml)
			f.close()
			level1path = os.getcwd()
			print('在路径为：' + level1path +'写入文件 cityinfo.json')

			allAreaHtml = urllib.request.urlopen('http://fzwjg.com/m2/s/index.php?mod=post&action=area&cityid='+str(id)).read()

			with open("allarea.json","wb") as f:
				f.write(allAreaHtml)
				# 写入完毕
				f.close()
				# 获取此时目录
				print('在路径为：' + level1path +'写入文件 allarea.json')

				# # 尝试打开文件
				# areaJson = open(r'allarea.json')
				# # json转为python对象
				# print(areaJson)
				# try:
				# 	s = json.load(areaJson)
				# except:
				# 	# s = json.load(areaJson)
				# 	s = {'areas':{}}
				# 	print(s)
				# finally:
				# 	print(s)
				# # 初始化length
				
				# try:
				# 	# 尝试获取其area属性的长度
				# 	length = len(s['areas'])
				# except :
				# 	# 无法读取时为0
				# 	length = 0;
				# finally:	 
				# 	# 关闭文件
				# 	areaJson.close()
				# # 输出
				# print('length'+str(length))
				# # 开始新的遍历
				# i = 1

				# while i < length:
				# 	print("内层遍历 第"+str(i)+"次")
				# 	allStreetHtml = urllib.request.urlopen('http://fzwjg.com/m2/s/index.php?mod=post&action=street&cityid=' + str(id) + '&areaid=' + str(streetIdStartPoint+ i)).read()
				# 	isExist=os.path.exists(str(streetIdStartPoint+i))

				# 	# if not isExist:
				# 	# 	os.makedirs('street'+str(streetIdStartPoint+i))

				# 	# os.chdir('street'+str(streetIdStartPoint+i))
				# 	# level2path = os.getcwd()
				# 	# print('创建并进入二级目录'+level2path)

				# 	with open("streetinfo"+str(i)+".json","wb") as f:
				# 		f.write(allStreetHtml)
				# 		# 写入完毕
				# 		f.close()
				# 		print('返回一级目录'+level1path)
				# 		# os.chdir(level1path)
				# 	i = i+1
				# 	streetIdStartPoint = streetIdStartPoint+1
				# print()
			# os.chdir(level1path)
		# print(areahtml)
		os.chdir(globalPath)
		id=id+1	

# getSomeJson(4)
getSomeJson(105,339)
