import json
import requests
import json
import datetime
from itertools import chain, islice


def notify(message):
    headers = {
        'Content-type': 'application/json',
    }

    data = {}
    data['text'] = message

    response = requests.post('https://hooks.slack.com/services/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', headers=headers, data=json.dumps(data))
    return response

def isCurrentWeekActivity(activity):
    my_date = datetime.date.today()
    current_week_year, current_week_num, current_day_of_week = my_date.isocalendar()
    return  datetime.datetime.strptime(activity["start_date_local"], "%Y-%m-%dT%H:%M:%SZ").isocalendar()[1] == current_week_num and datetime.datetime.strptime(activity["start_date_local"], "%Y-%m-%dT%H:%M:%SZ").isocalendar()[0] == current_week_year

def isActivityWithinLastNDays(activity, numberOfDays):
    number_of_days_ago = datetime.date.today() - datetime.timedelta(days=numberOfDays)
    return datetime.datetime.strptime(activity["start_date_local"], "%Y-%m-%dT%H:%M:%SZ").date() >= number_of_days_ago


def lambda_handler(event, context):
    activities = requests.get('https://remstravaactivities.azurewebsites.net/api/ActivitiesFromStorage').text
    activities = json.loads(activities)
    
    minimum_activities_per_week = 3
    ideal_activities_per_week = 5
    mileage_per_week_in_km = 50
    
    my_date = datetime.date.today()
    current_week_year, current_week_num, current_day_of_week = my_date.isocalendar()
    
    current_week_activities  = [activity for activity in activities   if isCurrentWeekActivity(activity)]
    seven_days_ago = datetime.date.today() - datetime.timedelta(days=7)
    #8 because the synchronization of activities takes place 2 a day only for now (2019-09-07)
    last_7_days_activities = [activity for activity in activities  if isActivityWithinLastNDays(activity,8)]
    
    print('CURRENT WEEK ACTIVITIES')
    print(current_week_activities)
    print('LAST 7 DAYS ACTIVITIES')
    print(last_7_days_activities)
    
        
    if len(last_7_days_activities) < 5:
        reminder_message = 'You have run ' + str(len(last_7_days_activities)) + ' times the last 7 days . Go run buddy'
        print(reminder_message)
        notify(reminder_message)
    else:
        reminder_message = 'Great Job Remi!'
        

    return {
        'statusCode': 200,
        'body': json.dumps(reminder_message)
    }




