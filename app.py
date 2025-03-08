from flask import Flask, render_template, request, redirect, url_for
from implementation import randorm_forest_test, random_forest_train, random_forest_predict
from sklearn.preprocessing import StandardScaler
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from random_forest import accuracy
from sklearn.metrics import accuracy_score
from time import time
app=Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/service')
def service():
    # Your logic here
    return render_template('service.html')

@app.route('/feature')
def feature():
    # Your view function code here
    return render_template('feature.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/appointment')
def appointment():
    # Your view function code here
    return render_template('appointment.html')

@app.route('/testimonial')
def testimonial():
    # Your view function code here
    return render_template('testimonial.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/result')
def result():
    return render_template('result.html')

@app.route('/result', methods=['POST']) 
def login_user():

	data_points = list()
	data = []
	string = 'value'
	for i in range(1,31):
		data.append(float(request.form['value'+str(i)]))

	for i in range(30):
		data_points.append(data[i])
		
	print(data_points)

	data_np = np.asarray(data, dtype = float)
	data_np = data_np.reshape(1,-1)
	out, acc, t = random_forest_predict(clf, data_np)

	if(out==1):
		output = 'Malignant'
	else:
		output = 'Benign'

	acc_x = acc[0][0]
	acc_y = acc[0][1]
	if(acc_x>acc_y):
		acc1 = acc_x
	else:
		acc1=acc_y
	return render_template('result.html', output=output, accuracy=accuracy, time=t)

@app.route('/page_not_found')
def page_not_found():
    return render_template('page_not_found.html'), 404
	
if __name__=='__main__':
	global clf 
	clf = random_forest_train()
	randorm_forest_test(clf)
	#print("Done")
	app.run(debug=True,port=5000)